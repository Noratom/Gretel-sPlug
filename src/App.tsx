import React, { useState, useEffect } from 'react';
import { BespokeDesign } from './types/bespoke';
import { BESPOKE_DESIGNS, ATELIER_INFO } from './data/designs';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Lookbook } from './components/Lookbook';
import { CraftsmanshipProcess } from './components/CraftsmanshipProcess';
import { BespokeOrderModal } from './components/BespokeOrderModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomDesignModal } from './components/CustomDesignModal';
import { MeasurementGuideModal } from './components/MeasurementGuideModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { fetchCatalogDesignsWithStatus, syncCatalogDesigns, DEFAULT_WHATSAPP_NUMBER } from './services/db';
import { Database, AlertTriangle, Copy, CheckCircle2, RefreshCw } from 'lucide-react';

export function App() {
  const [designs, setDesigns] = useState<BespokeDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState<BespokeDesign | null>(null);
  const [quickViewDesign, setQuickViewDesign] = useState<BespokeDesign | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals visibility
  const [isCustomDesignModalOpen, setIsCustomDesignModalOpen] = useState(false);
  const [isMeasurementGuideModalOpen, setIsMeasurementGuideModalOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Admin settings state
  const [whatsappNumber, setWhatsappNumber] = useState<string>(DEFAULT_WHATSAPP_NUMBER);
  const [adminPin, setAdminPin] = useState<string>('2020');

  // Database setup notice state
  const [needsTableSetup, setNeedsTableSetup] = useState(false);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlSetupScript = `-- COPY & PASTE THIS INTO SUPABASE SQL EDITOR AT supabase.com:
CREATE TABLE IF NOT EXISTS public.outfits (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text,
  tagline text,
  description text,
  base_price numeric,
  price_range text,
  crafting_time text,
  main_image text,
  gallery_images jsonb,
  fabrics jsonb,
  is_featured boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  details jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.outfits FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.outfits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.outfits FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.outfits FOR DELETE USING (true);`;

  const loadCatalogData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchCatalogDesignsWithStatus();
      setNeedsTableSetup(result.needsTableSetup);
      setIsCloudConnected(result.isCloudConnected);

      if (result.isCloudConnected) {
        setDesigns(result.designs);
      } else {
        // If local storage is completely empty and cloud not connected yet, initialize with default templates
        const saved = localStorage.getItem('GRETELS_PLUG_DESIGNS');
        if (saved) {
          setDesigns(result.designs);
        } else {
          setDesigns(BESPOKE_DESIGNS);
        }
      }
    } catch (e) {
      console.error('Error loading catalog data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  const handleSaveDesigns = async (updatedDesigns: BespokeDesign[]) => {
    setDesigns(updatedDesigns);
    const syncRes = await syncCatalogDesigns(updatedDesigns);
    if (syncRes.success) {
      setIsCloudConnected(true);
      setNeedsTableSetup(false);
    }
  };

  const handleCopySqlScript = () => {
    navigator.clipboard.writeText(sqlSetupScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="min-h-screen bg-cream-100 font-sans text-charcoal selection:bg-gold selection:text-charcoal flex flex-col">
      {/* Header */}
      <Header
        whatsappNumber={whatsappNumber}
        onOpenMeasurementGuide={() => setIsMeasurementGuideModalOpen(true)}
        onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
      />

      {/* SQL Table Setup Notice Banner if Supabase table outfits is missing */}
      {needsTableSetup && (
        <div className="bg-charcoal text-cream-100 px-4 py-3 border-b border-gold/40 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-gold">
              <AlertTriangle className="w-5 h-5 shrink-0 text-gold" />
              <div>
                <strong className="font-bold text-cream-100 text-sm">Supabase Database Action Required (30 Seconds):</strong>
                <p className="text-cream-100/80">
                  Your Supabase URL is connected, but the <code className="text-gold font-mono">outfits</code> table needs to be created in Supabase SQL Editor so edits stick globally across all phones.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopySqlScript}
                className="bg-gold hover:bg-gold-dark text-charcoal px-4 py-2 rounded-xl font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
              >
                {copiedSql ? <CheckCircle2 className="w-4 h-4 text-charcoal" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'SQL Code Copied!' : 'Copy 30-Sec SQL Script'}</span>
              </button>

              <button
                onClick={loadCatalogData}
                className="bg-white/10 hover:bg-white/20 text-cream-100 px-3 py-2 rounded-xl font-bold flex items-center gap-1 transition"
                title="Re-check Database Connection"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-check</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          whatsappNumber={whatsappNumber}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />

        <Catalog
          designs={designs}
          onSelectDesign={(design) => setSelectedDesign(design)}
          onQuickView={(design) => setQuickViewDesign(design)}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <Lookbook
          designs={designs}
          onSelectDesign={(design) => setSelectedDesign(design)}
          onQuickView={(design) => setQuickViewDesign(design)}
        />

        <CraftsmanshipProcess
          whatsappNumber={whatsappNumber}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        whatsappNumber={whatsappNumber}
        onOpenMeasurementGuide={() => setIsMeasurementGuideModalOpen(true)}
        onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
      />

      {/* Bespoke Order Modal */}
      {selectedDesign && (
        <BespokeOrderModal
          design={selectedDesign}
          whatsappNumber={whatsappNumber}
          onClose={() => setSelectedDesign(null)}
          onOpenMeasurementGuide={() => setIsMeasurementGuideModalOpen(true)}
        />
      )}

      {/* Quick View Product Detail Modal */}
      {quickViewDesign && (
        <ProductDetailModal
          design={quickViewDesign}
          onClose={() => setQuickViewDesign(null)}
          onOrderBespoke={(design) => {
            setQuickViewDesign(null);
            setSelectedDesign(design);
          }}
        />
      )}

      {/* Send Own Design Modal */}
      {isCustomDesignModalOpen && (
        <CustomDesignModal
          whatsappNumber={whatsappNumber}
          onClose={() => setIsCustomDesignModalOpen(false)}
          onOpenMeasurementGuide={() => setIsMeasurementGuideModalOpen(true)}
        />
      )}

      {/* Size & Measurement Guide Modal */}
      {isMeasurementGuideModalOpen && (
        <MeasurementGuideModal
          onClose={() => setIsMeasurementGuideModalOpen(false)}
        />
      )}

      {/* Admin Auth Modal */}
      {isAdminAuthOpen && (
        <AdminAuthModal
          adminPin={adminPin}
          onSuccess={() => {
            setIsAdminAuthOpen(false);
            setIsAdminModalOpen(true);
          }}
          onClose={() => setIsAdminAuthOpen(false)}
        />
      )}

      {/* Admin Panel Modal */}
      {isAdminModalOpen && (
        <AdminModal
          designs={designs}
          onSaveDesigns={handleSaveDesigns}
          whatsappNumber={whatsappNumber}
          onSaveWhatsappNumber={setWhatsappNumber}
          adminPin={adminPin}
          onSaveAdminPin={setAdminPin}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}
    </div>
  );
}
