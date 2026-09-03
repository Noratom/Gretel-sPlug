import React from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Sparkles, Ruler, Upload } from 'lucide-react';
import { ATELIER_INFO } from '../data/designs';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface FooterProps {
  whatsappNumber: string;
  onOpenMeasurementGuide: () => void;
  onOpenCustomDesignModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  whatsappNumber,
  onOpenMeasurementGuide,
  onOpenCustomDesignModal
}) => {
  return (
    <footer className="bg-charcoal-dark text-cream-100 border-t border-gold/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-cream-100/10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-gold overflow-hidden">
                <img src="/logo.jpg" alt="Air_Luxe Gretel's Plug Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-cream-100 block">Air_Luxe</span>
                <span className="text-[10px] text-gold uppercase tracking-[0.18em] font-bold">
                  Gretel's Plug EST 2020 • Custom Studio
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base text-gold/90 max-w-md">
              "{ATELIER_INFO.tagline}"
            </p>

            <p className="text-xs text-cream-100/70 leading-relaxed max-w-md font-light">
              Air_Luxe by Gretel's Plug EST 2020 specializes in making custom dresses, suits, kaftans, and luxury outfits tailored to your exact measurements and style preference.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-cream-100/75">
              <li>
                <a href="#catalog" className="hover:text-gold transition">Dresses & Gowns</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition">Suits & Two-Piece Sets</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold transition">Silk & Loungewear</a>
              </li>
              <li>
                <button onClick={onOpenCustomDesignModal} className="hover:text-gold transition text-gold font-bold flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Send Your Own Design Photo
                </button>
              </li>
              <li>
                <button onClick={onOpenMeasurementGuide} className="hover:text-gold transition text-gold font-bold flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Size & Fitting Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">WhatsApp Order</h4>
            <div className="space-y-2.5 text-xs text-cream-100/80">
              <button
                onClick={() => openWhatsAppGeneralInquiry(whatsappNumber)}
                className="flex items-center gap-2 text-gold hover:underline font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {whatsappNumber}</span>
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

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/40">
          <p>© {new Date().getFullYear()} Air_Luxe (Gretel's Plug EST 2020). All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-gold text-[11px] font-mono">
            <Sparkles className="w-3 h-3" />
            <span>CUSTOM MADE OUTFITS TAILORED TO FIT YOU PERFECTLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
