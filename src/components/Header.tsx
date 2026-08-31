import React, { useState } from 'react';
import { MessageCircle, Ruler, Sparkles, Menu, X, Settings } from 'lucide-react';
import { ATELIER_INFO } from '../data/designs';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface HeaderProps {
  onOpenMeasurementGuide: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMeasurementGuide,
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
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-silk-taupe/50 shadow-sm transition-all duration-300">
      {/* Top Banner Slogan */}
      <div className="bg-charcoal text-silk-cream text-[11px] md:text-xs py-1.5 px-4 text-center tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-gold animate-pulse" />
        <span>{ATELIER_INFO.tagline}</span>
        <Sparkles className="w-3 h-3 text-gold animate-pulse" />
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-charcoal hover:text-gold transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Emblem */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gold/40 shadow-inner group-hover:border-gold transition duration-300">
            <img 
              src="/logo.jpg" 
              alt="Air_Luxe Gretel's Plug Logo" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-charcoal group-hover:text-gold transition duration-300">
              Air_Luxe
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold -mt-1">
              Gretel's Plug 2020 • Est 2020
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/80">
          <button 
            onClick={() => scrollToSection('catalog')} 
            className="hover:text-gold transition duration-200 py-1 border-b border-transparent hover:border-gold"
          >
            Bespoke Collection
          </button>
          <button 
            onClick={() => scrollToSection('craftsmanship')} 
            className="hover:text-gold transition duration-200 py-1 border-b border-transparent hover:border-gold"
          >
            Atelier Process
          </button>
          <button 
            onClick={() => scrollToSection('lookbook')} 
            className="hover:text-gold transition duration-200 py-1 border-b border-transparent hover:border-gold"
          >
            Editorial Lookbook
          </button>
          <button 
            onClick={onOpenMeasurementGuide} 
            className="flex items-center gap-1.5 hover:text-gold transition duration-200 text-gold-dark font-bold py-1"
          >
            <Ruler className="w-3.5 h-3.5" />
            Size Guide
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Admin Manager Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-cream-200 hover:bg-gold text-charcoal px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition border border-silk-taupe shadow-xs"
            title="Manage Products & WhatsApp Settings"
          >
            <Settings className="w-3.5 h-3.5 text-gold-dark" />
            <span className="hidden md:inline">Manage Products</span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <button
            onClick={() => openWhatsAppGeneralInquiry()}
            className="flex items-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md border border-gold/30 hover:border-gold"
          >
            <MessageCircle className="w-4 h-4 text-gold group-hover:text-charcoal" />
            <span className="hidden sm:inline">WhatsApp Order</span>
            <span className="sm:hidden">Consult</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 border-b border-silk-taupe px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wider uppercase text-charcoal">
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              Bespoke Collection
            </button>
            <button 
              onClick={() => scrollToSection('craftsmanship')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              Atelier Process
            </button>
            <button 
              onClick={() => scrollToSection('lookbook')} 
              className="text-left py-2 border-b border-silk-taupe/40 hover:text-gold"
            >
              Editorial Lookbook
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenMeasurementGuide(); }} 
              className="text-left py-2 text-gold-dark font-bold flex items-center gap-2"
            >
              <Ruler className="w-4 h-4" />
              Measurement Guide
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
              className="text-left py-2 text-charcoal font-bold flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-gold" />
              Manage Products / Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
