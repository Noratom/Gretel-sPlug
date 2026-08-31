import React from 'react';
import { Scissors, Ruler, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

export const CraftsmanshipProcess: React.FC = () => {
  const steps = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "1. Select or Consult",
      subtitle: "Choose from our signature Air_Luxe collection or request a custom silhouette designed specifically for your event."
    },
    {
      icon: <Ruler className="w-6 h-6 text-gold" />,
      title: "2. Measure & Select Fabrics",
      subtitle: "Choose your preferred luxury fabric (Pure Silk, Velvet, Italian Wool) and submit your standard or exact body measurements."
    },
    {
      icon: <Scissors className="w-6 h-6 text-gold" />,
      title: "3. Master Atelier Crafting",
      subtitle: "Our master tailors hand-cut, bone, drape, and stitch your garment with meticulous precision within 5 to 10 business days."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-gold" />,
      title: "4. Direct Fitting & Delivery",
      subtitle: "Your outfit is delivered directly to your doorstep. Enjoy direct WhatsApp fitting support for any personalized tweaks."
    }
  ];

  return (
    <section id="craftsmanship" className="py-20 bg-cream-200/60 border-y border-silk-taupe/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-gold font-extrabold text-xs uppercase tracking-[0.3em]">
            THE BESPOKE EXPERIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            How Air_Luxe Brings Your Custom Outfit to Life
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base font-medium">
            Every garment from Gretel's Plug 2020 is created individually to match your unique measurements and personal style preference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-cream-100 p-8 rounded-2xl border border-silk-taupe shadow-sm hover:shadow-md transition duration-300 relative flex flex-col justify-between group hover:border-gold"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-cream-200 border border-gold/40 flex items-center justify-center group-hover:scale-110 transition duration-300">
                  {step.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold-dark transition duration-200">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal">
                  {step.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-silk-taupe/40 flex items-center justify-between text-[11px] font-bold text-gold uppercase tracking-wider">
                <span>Step 0{idx + 1}</span>
                <span className="opacity-40 font-mono">EST 2020</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openWhatsAppGeneralInquiry(undefined, "Bespoke Fitting & Tailoring Consultation")}
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-md transition duration-300"
          >
            <span>Book A Custom WhatsApp Fitting</span>
          </button>
        </div>
      </div>
    </section>
  );
};
