import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CraftsmanshipProcess } from './components/CraftsmanshipProcess';
import { Catalog } from './components/Catalog';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';
import { BespokeOrderModal } from './components/BespokeOrderModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MeasurementGuideModal } from './components/MeasurementGuideModal';
import { CustomDesignModal } from './components/CustomDesignModal';
import { AdminModal } from './components/AdminModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { BespokeDesign } from './types/bespoke';
import { BESPOKE_DESIGNS } from './data/designs';
import { DEFAULT_WHATSAPP_NUMBER } from './utils/whatsapp';

const STORAGE_KEY_DESIGNS = 'GRETELS_PLUG_DESIGNS';
const STORAGE_KEY_PHONE = 'GRETELS_PLUG_WHATSAPP';
const STORAGE_KEY_PIN = 'GRETELS_PLUG_ADMIN_PIN';

export function App() {
  // Load initial designs from LocalStorage or default dataset
  const [designs, setDesigns] = useState<BespokeDesign[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DESIGNS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved designs', e);
      }
    }
    return BESPOKE_DESIGNS;
  });

  // Load WhatsApp phone number (Default: '09161273360')
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PHONE) || DEFAULT_WHATSAPP_NUMBER;
  });

  // Load Admin PIN (Default: '2020')
  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PIN) || '2020';
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [designForOrder, setDesignForOrder] = useState<BespokeDesign | null>(null);
  const [designForQuickView, setDesignForQuickView] = useState<BespokeDesign | null>(null);
  const [isMeasurementGuideOpen, setIsMeasurementGuideOpen] = useState(false);
  const [isCustomDesignModalOpen, setIsCustomDesignModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Keyboard shortcut listener (Ctrl + Shift + A) to open Admin Auth
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAuthModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save designs state to LocalStorage with robust error checking
  const handleSaveDesigns = (updatedDesigns: BespokeDesign[]) => {
    setDesigns(updatedDesigns);
    try {
      localStorage.setItem(STORAGE_KEY_DESIGNS, JSON.stringify(updatedDesigns));
    } catch (e) {
      console.error('LocalStorage save error:', e);
      alert('Note: Storage warning - your product changes are saved for this session!');
    }
  };

  // Save WhatsApp number
  const handleSaveWhatsappNumber = (newNumber: string) => {
    setWhatsappNumber(newNumber);
    try {
      localStorage.setItem(STORAGE_KEY_PHONE, newNumber);
    } catch (e) {
      console.error('LocalStorage phone save error', e);
    }
  };

  // Save Admin PIN
  const handleSaveAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem(STORAGE_KEY_PIN, newPin);
    } catch (e) {
      console.error('LocalStorage PIN save error', e);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal font-sans flex flex-col selection:bg-gold/30">
      {/* Navigation Header */}
      <Header
        whatsappNumber={whatsappNumber}
        onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        onOpenAdmin={() => setIsAuthModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          whatsappNumber={whatsappNumber}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />

        {/* 4-Step Process */}
        <CraftsmanshipProcess
          whatsappNumber={whatsappNumber}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />

        {/* Made-to-Order Catalog */}
        <Catalog
          designs={designs}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSelectDesign={(design) => setDesignForOrder(design)}
          onQuickView={(design) => setDesignForQuickView(design)}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />

        {/* Featured Lookbook */}
        <Lookbook
          designs={designs}
          whatsappNumber={whatsappNumber}
          onSelectDesign={(design) => setDesignForOrder(design)}
          onQuickView={(design) => setDesignForQuickView(design)}
          onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        whatsappNumber={whatsappNumber}
        onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        onOpenCustomDesignModal={() => setIsCustomDesignModalOpen(true)}
      />

      {/* WhatsApp Order & Measurement Modal */}
      {designForOrder && (
        <BespokeOrderModal
          design={designForOrder}
          whatsappNumber={whatsappNumber}
          onClose={() => setDesignForOrder(null)}
          onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        />
      )}

      {/* Quick View Modal */}
      {designForQuickView && (
        <ProductDetailModal
          design={designForQuickView}
          onClose={() => setDesignForQuickView(null)}
          onOrderBespoke={(design) => setDesignForOrder(design)}
        />
      )}

      {/* Measurement Guide Modal */}
      {isMeasurementGuideOpen && (
        <MeasurementGuideModal onClose={() => setIsMeasurementGuideOpen(false)} />
      )}

      {/* Send Your Own Design Modal */}
      {isCustomDesignModalOpen && (
        <CustomDesignModal
          whatsappNumber={whatsappNumber}
          onClose={() => setIsCustomDesignModalOpen(false)}
          onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        />
      )}

      {/* Passcode Security Auth Prompt */}
      {isAuthModalOpen && (
        <AdminAuthModal
          correctPin={adminPin}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            setIsAdminOpen(true);
          }}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* Admin Manager Modal */}
      {isAdminOpen && (
        <AdminModal
          designs={designs}
          onSaveDesigns={handleSaveDesigns}
          whatsappNumber={whatsappNumber}
          onSaveWhatsappNumber={handleSaveWhatsappNumber}
          adminPin={adminPin}
          onSaveAdminPin={handleSaveAdminPin}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
