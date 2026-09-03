import React, { useState, useEffect } from 'react';
import { BespokeDesign } from '../types/bespoke';
import { Scissors, Sparkles, MessageCircle, Eye } from 'lucide-react';

interface DesignCardProps {
  design: BespokeDesign;
  onSelectDesign: (design: BespokeDesign) => void;
  onQuickView: (design: BespokeDesign) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  onSelectDesign,
  onQuickView
}) => {
  const images = design.galleryImages && design.galleryImages.length > 0
    ? design.galleryImages.slice(0, 3)
    : [design.mainImage];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slideshow effect every 3.5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div 
      className="group bg-cream-100 rounded-3xl overflow-hidden border border-gold/30 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Automated Slideshow */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200 cursor-pointer" onClick={() => onQuickView(design)}>
        <img
          src={images[currentImageIndex] || design.mainImage}
          alt={design.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {design.isNewArrival && (
            <span className="bg-gold text-charcoal text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              NEW
            </span>
          )}
          {design.isFeatured && (
            <span className="bg-charcoal text-cream-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/40 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              Featured
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-charcoal/85 backdrop-blur-md text-gold text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-gold/30">
            {design.category}
          </span>
        </div>

        {/* Slideshow Dot Indicators (If multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-5 bg-gold' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-cream-100/95 text-charcoal px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-gold">
            <Eye className="w-3.5 h-3.5 text-gold-dark" />
            Quick View
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 
            onClick={() => onQuickView(design)}
            className="font-serif text-xl font-bold text-charcoal group-hover:text-gold-dark transition duration-200 cursor-pointer line-clamp-1"
          >
            {design.title}
          </h3>
          <p className="text-xs text-charcoal/70 font-normal line-clamp-2 leading-relaxed">
            {design.tagline || design.description}
          </p>
        </div>

        {/* Fabric Swatch Colors Preview */}
        {design.fabrics.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-charcoal/60">Fabrics:</span>
            <div className="flex items-center gap-1.5">
              {design.fabrics.slice(0, 4).map((f) => (
                <span
                  key={f.id}
                  title={f.name}
                  className="w-3.5 h-3.5 rounded-full border border-charcoal/30 shadow-xs"
                  style={{ backgroundColor: f.colorHex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price & WhatsApp Action Row */}
        <div className="pt-4 border-t border-silk-taupe/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-charcoal/50 uppercase block">Starting Price</span>
            <span className="text-xs font-extrabold text-gold-dark font-mono">{design.priceRange}</span>
          </div>

          <button
            onClick={() => onSelectDesign(design)}
            className="flex items-center gap-1.5 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition duration-300 shadow-sm border border-gold/30"
          >
            <MessageCircle className="w-3.5 h-3.5 text-gold group-hover:text-charcoal" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
