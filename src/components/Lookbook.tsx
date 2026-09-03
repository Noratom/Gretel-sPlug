import React from 'react';
import { BespokeDesign } from '../types/bespoke';
import { Sparkles, MessageCircle, Upload, Scissors } from 'lucide-react';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface LookbookProps {
  designs: BespokeDesign[];
  whatsappNumber: string;
  onSelectDesign: (design: BespokeDesign) => void;
  onQuickView: (design: BespokeDesign) => void;
  onOpenCustomDesignModal: () => void;
}

export const Lookbook: React.FC<LookbookProps> = ({
  designs,
  whatsappNumber,
  onSelectDesign,
  onQuickView,
  onOpenCustomDesignModal
}) => {
  // Featured outfits
  const featuredShots = designs.filter(d => d.isFeatured).length > 0
    ? designs.filter(d => d.isFeatured).slice(0, 6)
    : designs.slice(0, 6);

  return (
    <section id="lookbook" className="py-20 bg-charcoal text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR FEATURED CREATIONS</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100">
            Gretel's Plug Signature Designs
          </h2>
          <p className="text-cream-100/75 text-sm sm:text-base max-w-2xl mx-auto font-light">
            "Custom Made Outfits Tailored to Fit You Perfectly."
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShots.map((design) => (
            <div
              key={design.id}
              onClick={() => onQuickView(design)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/30 shadow-2xl cursor-pointer bg-charcoal-dark"
            >
              <img
                src={design.mainImage}
                alt={design.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90 group-hover:opacity-95 transition duration-300 flex flex-col justify-end p-6 sm:p-8">
                <span className="text-[10px] text-gold font-extrabold uppercase tracking-[0.2em] mb-1 inline-block">
                  {design.category}
                </span>

                <h3 className="font-serif text-2xl font-bold text-cream-100 leading-tight group-hover:text-gold transition duration-200">
                  {design.title}
                </h3>

                <p className="text-xs text-cream-100/75 mt-1.5 font-light line-clamp-2">
                  {design.tagline || design.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gold/30 flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{design.priceRange}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDesign(design);
                    }}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-charcoal px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Outfit Inspiration Banner */}
        <div className="mt-16 bg-cream-100 text-charcoal rounded-3xl p-8 md:p-12 border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-gold-dark text-xs font-bold uppercase tracking-[0.2em]">HAVE A DESIGN PHOTO YOU WANT US TO MAKE?</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal">
              Send Us Your Own Design Photo
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/75 max-w-xl">
              Upload any picture of an outfit you saw online or drew yourself. We will review your photo and craft it to fit your body perfectly!
            </p>
          </div>

          <button
            onClick={onOpenCustomDesignModal}
            className="shrink-0 flex items-center gap-3 bg-gold hover:bg-gold-dark text-charcoal px-8 py-4 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Upload className="w-5 h-5" />
            Upload Design Photo Now
          </button>
        </div>
      </div>
    </section>
  );
};
