import React, { useState } from 'react';
import { MessageCircle, Ruler, Sparkles, Menu, X, Settings, Upload } from 'lucide-react';
import { ATELIER_INFO } from '../data/designs';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface HeaderProps {
  whatsappNumber: string;
  onOpenMeasurementGuide: () => void;
  onOpenCustomDesignModal: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  whatsappNumber,
  onOpenMeasurementGuide,
  onOpenCustomDesignModal,
  onOpenAdmin,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur-md border-b border-silk-taupe/50 shadow-sm transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-silk-cream text-[11px] md:text-xs py-1.5 px-4 text-center tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
        <span>GRETEL'S PLUG • {ATELIER_INFO.tagline}</span>
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-charcoal hover:text-gold transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Name */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gold/40 shadow-inner group-hover:border-gold transition duration-300">
            <img 
              src="/logo.jpg" 
              alt="Gretel's Plug Logo" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-charcoal group-hover:text-gold transition duration-300">
              Gretel's Plug
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold -mt-1">
              Custom Outfit Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.12em] text-charcoal/80">
          <button 
            onClick={() => scrollToSection('catalog')} 
            className="hover:text-gold transition duration-200 py-1"
          >
            Outfit Catalog
          </button>
          <button 
            onClick={() => scrollToSection('craftsmanship')} 
            className="hover:text-gold transition duration-200 py-1"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('lookbook')} 
            className="hover:text-gold transition duration-200 py-1"
          >
            Our Designs
          </button>
          <button 
            onClick={onOpenCustomDesignModal} 
            className="text-gold-dark font-extrabold flex items-center gap-1.5 hover:underline py-1"
          >
            <Upload className="w-3.5 h-3.5" />
            Send Your Own Design
          </button>
          <button 
            onClick={onOpenMeasurementGuide} 
            className="flex items-center gap-1 hover:text-gold transition text-charcoal/80 py-1"
          >
            <Ruler className="w-3.5 h-3.5 text-gold" />
            Size Guide
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-cream-200 hover:bg-gold text-charcoal px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition border border-silk-taupe"
            title="Manage Products & Settings"
          >
            <Settings className="w-3.5 h-3.5 text-gold-dark" />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <button
            onClick={() => openWhatsAppGeneralInquiry(whatsappNumber)}
            className="flex items-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md border border-gold/30"
          >
            <MessageCircle className="w-4 h-4 text-gold group-hover:text-charcoal" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 border-b border-silk-taupe px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-3 text-xs font-bold tracking-wider uppercase text-charcoal">
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              Outfit Catalog
            </button>
            <button 
              onClick={() => scrollToSection('craftsmanship')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('lookbook')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              Our Designs
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenCustomDesignModal(); }} 
              className="text-left py-2 text-gold-dark font-extrabold flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Send Your Own Design Photo
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenMeasurementGuide(); }} 
              className="text-left py-2 text-charcoal font-bold flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-gold" />
              Size & Fit Guide
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
              className="text-left py-2 text-charcoal font-bold flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-gold" />
              Admin Manager
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
