import React from 'react';
import { BespokeDesign } from '../types/bespoke';
import { MessageCircle, Eye, Clock, Sparkles, Scissors } from 'lucide-react';

interface DesignCardProps {
  design: BespokeDesign;
  onSelectDesign: (design: BespokeDesign) => void;
  onQuickView: (design: BespokeDesign) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, onSelectDesign, onQuickView }) => {
  return (
    <div className="bg-cream-100 rounded-2xl overflow-hidden border border-silk-taupe/80 shadow-sm hover:shadow-xl transition duration-500 flex flex-col group hover:border-gold/60">
      {/* Image Container with Hover Effects */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200 cursor-pointer" onClick={() => onQuickView(design)}>
        <img
          src={design.mainImage}
          alt={design.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 ease-out"
        />

        {/* Overlay Darkening on Hover */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(design); }}
            className="bg-cream-100/90 text-charcoal hover:bg-gold p-3 rounded-full shadow-lg transform transition hover:scale-110"
            title="Quick View & Specs"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {design.isNewArrival && (
            <span className="bg-gold text-charcoal text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full shadow-sm">
              NEW ARRIVAL
            </span>
          )}
          {design.isFeatured && (
            <span className="bg-charcoal text-cream-100 text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              BESPOKE SIGNATURE
            </span>
          )}
        </div>

        {/* Crafting Time Pill */}
        <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-cream-100 text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-gold" />
          <span>{design.craftingTime}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gold-dark">
            <span>{design.category}</span>
            <span className="font-mono text-charcoal/60 font-normal">{design.priceRange}</span>
          </div>

          <h3 
            onClick={() => onQuickView(design)}
            className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-gold-dark transition duration-200 cursor-pointer line-clamp-1"
          >
            {design.title}
          </h3>

          <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed font-normal">
            {design.tagline}
          </p>
        </div>

        {/* Fabric Availability Swatches Preview */}
        <div className="pt-2 border-t border-silk-taupe/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-charcoal/60 mr-1">Fabrics:</span>
            {design.fabrics.map((f, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-charcoal/30 shadow-xs"
                style={{ backgroundColor: f.colorHex }}
                title={`${f.name} (${f.texture})`}
              />
            ))}
          </div>

          <span className="text-[10px] text-charcoal/50 italic font-serif">Tailored to fit</span>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onQuickView(design)}
            className="w-full flex items-center justify-center gap-1.5 bg-cream-200 hover:bg-silk-taupe text-charcoal py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition border border-silk-taupe"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onSelectDesign(design)}
            className="w-full flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-dark text-charcoal py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
