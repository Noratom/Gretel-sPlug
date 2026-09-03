import React, { useState, useEffect } from 'react';
import { BespokeDesign } from '../types/bespoke';
import { X, Clock, CheckCircle2, Scissors } from 'lucide-react';

interface ProductDetailModalProps {
  design: BespokeDesign | null;
  onClose: () => void;
  onOrderBespoke: (design: BespokeDesign) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  design,
  onClose,
  onOrderBespoke
}) => {
  if (!design) return null;

  const images = design.galleryImages && design.galleryImages.length > 0
    ? design.galleryImages.slice(0, 3)
    : [design.mainImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-slideshow timer every 3.5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-charcoal">
      <div className="bg-cream-100 w-full max-w-4xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-charcoal/80 hover:bg-gold text-cream-100 hover:text-charcoal p-2 rounded-full transition shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-[92vh]">
          {/* Left: Gallery View with Auto-Slideshow */}
          <div className="p-6 bg-cream-200/50 flex flex-col items-center justify-between gap-4">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gold/30 shadow-md relative bg-cream-100">
              <img
                src={images[activeImageIndex] || design.mainImage}
                alt={design.title}
                className="w-full h-full object-cover transition duration-700 ease-out"
              />

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-charcoal/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeImageIndex ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Switcher */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-gold scale-105 shadow-sm ring-2 ring-gold/30' : 'border-silk-taupe opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gold-dark">
                <span>{design.category}</span>
                <span className="font-mono bg-gold/10 px-2.5 py-1 rounded-full text-charcoal">{design.priceRange}</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-charcoal">{design.title}</h2>
              <p className="font-serif italic text-base text-gold-dark font-medium">{design.tagline}</p>

              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal">
                {design.description}
              </p>

              {/* Crafting Time */}
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal bg-cream-200 p-3 rounded-xl border border-silk-taupe">
                <Clock className="w-4 h-4 text-gold" />
                <span>Ready in: <strong>{design.craftingTime}</strong></span>
              </div>

              {/* Fabric Choices Preview */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-charcoal block">Available Fabric Colors & Textures:</span>
                <div className="space-y-2">
                  {design.fabrics.map((fabric) => (
                    <div key={fabric.id} className="flex items-center gap-2 text-xs text-charcoal/80 bg-cream-100 p-2.5 rounded-lg border border-silk-taupe/80">
                      <span className="w-4 h-4 rounded-full border border-charcoal/30" style={{ backgroundColor: fabric.colorHex }} />
                      <span className="font-bold text-charcoal">{fabric.name}:</span>
                      <span className="text-charcoal/60 italic">{fabric.texture}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-charcoal block">Outfit Features:</span>
                <ul className="space-y-1.5 text-xs text-charcoal/75">
                  {design.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Action */}
            <div className="pt-4 border-t border-silk-taupe space-y-3">
              <button
                onClick={() => { onClose(); onOrderBespoke(design); }}
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition duration-300"
              >
                <Scissors className="w-4 h-4" />
                Order & Customize via WhatsApp
              </button>

              <p className="text-[10px] text-center text-charcoal/50 uppercase tracking-widest">
                Air_Luxe • Gretel's Plug EST 2020 • Custom Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
