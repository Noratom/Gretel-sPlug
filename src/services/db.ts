import { createClient } from '@supabase/supabase-js';
import { BespokeDesign } from '../types/bespoke';

const STORAGE_KEY_DESIGNS = 'GRETELS_PLUG_DESIGNS';
const STORAGE_KEY_SUPABASE_URL = 'GRETELS_PLUG_SUPABASE_URL';
const STORAGE_KEY_SUPABASE_KEY = 'GRETELS_PLUG_SUPABASE_KEY';
const STORAGE_KEY_INITIALIZED = 'GRETELS_PLUG_INITIALIZED_V2';

export const DEFAULT_SUPABASE_URL = 'https://ofvkcrmodfxytghoxnhi.supabase.co';
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_LMFKUo4WVfbEucI-Fx8utg_PXRAVcH9';

export function getSupabaseCredentials(): { url: string; key: string } {
  const metaEnv = (import.meta as any).env || {};
  const url = metaEnv.VITE_SUPABASE_URL || localStorage.getItem(STORAGE_KEY_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
  const key = metaEnv.VITE_SUPABASE_ANON_KEY || localStorage.getItem(STORAGE_KEY_SUPABASE_KEY) || DEFAULT_SUPABASE_KEY;
  return { url, key };
}

export function createSupabaseInstance() {
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.error('Supabase initialization error', e);
    }
  }
  return null;
}

export interface CatalogFetchResult {
  designs: BespokeDesign[];
  isCloudConnected: boolean;
  needsTableSetup: boolean;
  errorMsg?: string;
}

/**
 * Fetch designs from Supabase cloud database as single source of truth.
 */
export async function fetchCatalogDesignsWithStatus(): Promise<CatalogFetchResult> {
  const supabase = createSupabaseInstance();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('outfits').select('*').order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase fetch error:', error);
        // Error PGRST205 means outfits table has not been created yet in Supabase
        const tableMissing = error.code === 'PGRST205' || (error.message && error.message.includes('outfits'));
        return {
          designs: getLocalStorageDesigns(),
          isCloudConnected: false,
          needsTableSetup: tableMissing,
          errorMsg: error.message
        };
      }

      if (data !== null) {
        const mapped: BespokeDesign[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          tagline: item.tagline || '',
          description: item.description || '',
          basePriceUSD: item.base_price || 500,
          priceRange: item.price_range || '₦50,000 - ₦100,000',
          craftingTime: item.crafting_time || '5 - 7 Days',
          mainImage: item.main_image || '',
          galleryImages: item.gallery_images || [item.main_image || ''],
          fabrics: item.fabrics || [],
          isFeatured: item.is_featured ?? false,
          isNewArrival: item.is_new_arrival ?? false,
          details: item.details || ['Handmade to fit']
        }));

        // Cache latest cloud data locally
        try {
          localStorage.setItem(STORAGE_KEY_DESIGNS, JSON.stringify(mapped));
          localStorage.setItem(STORAGE_KEY_INITIALIZED, 'true');
        } catch (e) {
          console.error('LocalStorage cache error', e);
        }

        return {
          designs: mapped,
          isCloudConnected: true,
          needsTableSetup: false
        };
      }
    } catch (e: any) {
      console.error('Cloud database fetch exception', e);
    }
  }

  return {
    designs: getLocalStorageDesigns(),
    isCloudConnected: false,
    needsTableSetup: false
  };
}

function getLocalStorageDesigns(): BespokeDesign[] {
  const saved = localStorage.getItem(STORAGE_KEY_DESIGNS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error('LocalStorage parse error', e);
    }
  }
  return [];
}

/**
 * Sync designs list to Supabase cloud database and localStorage.
 */
export async function syncCatalogDesigns(designs: BespokeDesign[]): Promise<{ success: boolean; errorMsg?: string }> {
  // Always update local storage
  try {
    localStorage.setItem(STORAGE_KEY_DESIGNS, JSON.stringify(designs));
    localStorage.setItem(STORAGE_KEY_INITIALIZED, 'true');
  } catch (e) {
    console.error('LocalStorage save error', e);
  }

  const supabase = createSupabaseInstance();
  if (supabase) {
    try {
      // Delete missing items from Cloud DB if user deleted them
      const { data: existingRows } = await supabase.from('outfits').select('id');
      if (existingRows) {
        const currentIds = new Set(designs.map(d => d.id));
        const idsToDelete = existingRows.filter(r => !currentIds.has(r.id)).map(r => r.id);
        if (idsToDelete.length > 0) {
          await supabase.from('outfits').delete().in('id', idsToDelete);
        }
      }

      if (designs.length > 0) {
        // Upsert all current outfits to cloud database
        const rows = designs.map(d => ({
          id: d.id,
          title: d.title,
          category: d.category,
          tagline: d.tagline,
          description: d.description,
          base_price: d.basePriceUSD,
          price_range: d.priceRange,
          crafting_time: d.craftingTime,
          main_image: d.mainImage,
          gallery_images: d.galleryImages,
          fabrics: d.fabrics,
          is_featured: d.isFeatured,
          is_new_arrival: d.isNewArrival,
          details: d.details
        }));

        const { error } = await supabase.from('outfits').upsert(rows, { onConflict: 'id' });
        if (error) {
          console.error('Supabase cloud sync error:', error);
          return { success: false, errorMsg: error.message };
        }
      }
      return { success: true };
    } catch (e: any) {
      console.error('Supabase sync exception', e);
      return { success: false, errorMsg: e.message };
    }
  }

  return { success: true };
}

/**
 * Delete a specific design from Supabase cloud database.
 */
export async function deleteCatalogDesignFromCloud(id: string): Promise<void> {
  const supabase = createSupabaseInstance();
  if (supabase) {
    try {
      await supabase.from('outfits').delete().eq('id', id);
    } catch (e) {
      console.error('Cloud delete error', e);
    }
  }
}

export function saveSupabaseCredentials(url: string, key: string) {
  localStorage.setItem(STORAGE_KEY_SUPABASE_URL, url);
  localStorage.setItem(STORAGE_KEY_SUPABASE_KEY, key);
}
