import { createClient } from '@supabase/supabase-js';
import { BespokeDesign } from '../types/bespoke';
import { BESPOKE_DESIGNS } from '../data/designs';

const STORAGE_KEY_DESIGNS = 'GRETELS_PLUG_DESIGNS';
const STORAGE_KEY_SUPABASE_URL = 'GRETELS_PLUG_SUPABASE_URL';
const STORAGE_KEY_SUPABASE_KEY = 'GRETELS_PLUG_SUPABASE_KEY';

export const DEFAULT_SUPABASE_URL = 'https://ofvkcrmodfxytghoxnhi.supabase.co';

export function getSupabaseCredentials(): { url: string; key: string } {
  const metaEnv = (import.meta as any).env || {};
  const url = metaEnv.VITE_SUPABASE_URL || localStorage.getItem(STORAGE_KEY_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
  const key = metaEnv.VITE_SUPABASE_ANON_KEY || localStorage.getItem(STORAGE_KEY_SUPABASE_KEY) || '';
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

/**
 * Fetch designs from Supabase cloud database if configured, or fallback to localStorage / default catalog.
 */
export async function fetchCatalogDesigns(): Promise<BespokeDesign[]> {
  const supabase = createSupabaseInstance();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('outfits').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
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
      }
    } catch (e) {
      console.error('Cloud database fetch error', e);
    }
  }

  // Fallback to local storage or default catalog
  const saved = localStorage.getItem(STORAGE_KEY_DESIGNS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('LocalStorage parse error', e);
    }
  }

  return BESPOKE_DESIGNS;
}

/**
 * Sync designs list to Supabase cloud database and localStorage.
 */
export async function syncCatalogDesigns(designs: BespokeDesign[]): Promise<boolean> {
  // Always update local storage
  try {
    localStorage.setItem(STORAGE_KEY_DESIGNS, JSON.stringify(designs));
  } catch (e) {
    console.error('LocalStorage save error', e);
  }

  const supabase = createSupabaseInstance();
  if (supabase) {
    try {
      // Upsert all outfits to cloud database
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
        return false;
      }
      return true;
    } catch (e) {
      console.error('Supabase sync exception', e);
      return false;
    }
  }

  return true;
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
