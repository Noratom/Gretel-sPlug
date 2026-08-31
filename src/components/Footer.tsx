import React from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Sparkles, Phone, Ruler } from 'lucide-react';
import { ATELIER_INFO } from '../data/designs';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface FooterProps {
  onOpenMeasurementGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMeasurementGuide }) => {
  return (
    <footer className="bg-charcoal-dark text-cream-100 border-t border-gold/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-cream-100/10 pb-12">
          {/* Brand Identity Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-gold overflow-hidden">
                <img src="/logo.jpg" alt="Air_Luxe Gretel's Plug" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-cream-100 block">Air_Luxe</span>
                <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-semibold">
                  Gretel's Plug 2020 • EST 2020
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base text-gold/90 max-w-md">
              "{ATELIER_INFO.tagline}"
            </p>

            <p className="text-xs text-cream-100/60 leading-relaxed max-w-md font-light">
              Air_Luxe is a premier haute-couture & custom-made outfit atelier specializing in tailored evening gowns, bespoke suits, and silk luxury ensembles crafted to fit your exact measurements.
            </p>
          </div>

          {/* Bespoke Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">Atelier Services</h4>
            <ul className="space-y-2 text-xs text-cream-100/70">
              <li>
                <a href="#catalog" className="hover:text-gold transition">Gowns & Evening Wear</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition">Bespoke Suits & Sets</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition">Silk Luxury & Loungewear</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition">Red Carpet Couture</a>
              </li>
              <li>
                <button onClick={onOpenMeasurementGuide} className="hover:text-gold transition text-gold text-left font-semibold flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Size & Fit Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp & Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">Direct Order</h4>
            <div className="space-y-2.5 text-xs text-cream-100/80">
              <button
                onClick={() => openWhatsAppGeneralInquiry()}
                className="flex items-center gap-2 text-gold hover:underline font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct Consultation</span>
              </button>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gold" />
                <span>{ATELIER_INFO.instagram}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>{ATELIER_INFO.email}</span>
              </div>

              <div className="flex items-center gap-2 text-cream-100/60">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{ATELIER_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/40">
          <p>© {new Date().getFullYear()} Air_Luxe (Gretel's Plug 2020). All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-gold text-[11px] font-mono">
            <Sparkles className="w-3 h-3" />
            <span>DRIVEN BY QUALIFYING & CHOSEN BY THOSE WHO KNOW THE DIFFERENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
