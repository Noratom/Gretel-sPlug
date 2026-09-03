import React from 'react';
import { MessageCircle, Scissors, ChevronDown, Sparkles, Upload } from 'lucide-react';
import { ATELIER_INFO } from '../data/designs';

interface HeroProps {
  whatsappNumber: string;
  onOpenCustomDesignModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ whatsappNumber, onOpenCustomDesignModal }) => {
  const scrollToCatalog = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cream-100 py-16 px-4">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-silk-taupe/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
        {/* Brand Logo & Emblem */}
        <div className="inline-flex flex-col items-center justify-center animate-fadeIn">
          <div className="relative p-1 rounded-full bg-gradient-to-b from-gold via-gold/50 to-transparent shadow-lg mb-3">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-cream-100 shadow-2xl">
              <img 
                src="/logo.jpg" 
                alt="Air_Luxe Gretel's Plug Logo" 
                className="w-full h-full object-cover object-center scale-105 transform hover:scale-110 transition duration-700" 
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gold font-bold tracking-[0.25em] text-xs uppercase my-1">
            <span className="h-[1px] w-8 bg-gold/40"></span>
            <span>GRETEL'S PLUG</span>
            <span className="h-[1px] w-8 bg-gold/40"></span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal leading-[1.1]">
            Air_Luxe
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-gold-dark font-semibold max-w-2xl mx-auto">
            {ATELIER_INFO.tagline}
          </p>
        </div>

        {/* Short Motto Box */}
        <div className="max-w-2xl mx-auto bg-cream-200/80 backdrop-blur-sm border border-gold/30 p-6 rounded-2xl shadow-sm relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] font-extrabold tracking-[0.2em] uppercase px-4 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            WHAT WE DO
          </div>
          <p className="text-sm sm:text-base md:text-lg font-medium text-charcoal leading-relaxed pt-1">
            We make beautiful custom dresses, suits, kaftans, and outfits tailored to your exact body measurements and favorite colors.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={scrollToCatalog}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.15em] shadow-lg transition duration-300 transform hover:-translate-y-0.5 border border-gold/40"
          >
            <Scissors className="w-4 h-4" />
            Browse Available Outfits
          </button>

          <button
            onClick={onOpenCustomDesignModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.15em] shadow-lg transition duration-300 transform hover:-translate-y-0.5"
          >
            <Upload className="w-4 h-4" />
            Send Your Own Design Photo
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-6">
          <button
            onClick={scrollToCatalog}
            className="inline-flex flex-col items-center text-charcoal/60 hover:text-gold transition duration-200 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            <span>See Outfits Below</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
