import React from 'react';
import { Scissors, Ruler, Sparkles, CheckCircle2, Upload } from 'lucide-react';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface CraftsmanshipProcessProps {
  whatsappNumber: string;
  onOpenCustomDesignModal: () => void;
}

export const CraftsmanshipProcess: React.FC<CraftsmanshipProcessProps> = ({
  whatsappNumber,
  onOpenCustomDesignModal
}) => {
  const steps = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "1. Pick an Outfit or Send a Photo",
      subtitle: "Choose an outfit from our website catalog OR upload a picture of a design you found online that you want us to make."
    },
    {
      icon: <Ruler className="w-6 h-6 text-gold" />,
      title: "2. Choose Fabric & Sizes",
      subtitle: "Select your favorite fabric color and send us your body measurements or standard dress size (XS to XXL)."
    },
    {
      icon: <Scissors className="w-6 h-6 text-gold" />,
      title: "3. We Make Your Outfit",
      subtitle: "Our skilled tailors hand-cut and sew your outfit with neat stitching within 5 to 7 days."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-gold" />,
      title: "4. Fast Delivery & Fitting",
      subtitle: "We deliver your ready outfit directly to your doorstep. If you need any small adjustments, we are always available on WhatsApp!"
    }
  ];

  return (
    <section id="craftsmanship" className="py-20 bg-cream-200/60 border-y border-silk-taupe/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-gold font-extrabold text-xs uppercase tracking-[0.25em]">
            EASY 4-STEP PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            How Gretel's Plug Makes Your Custom Outfit
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Ordering a custom outfit is super simple and fast. Here is how it works:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-cream-100 p-7 rounded-2xl border border-silk-taupe shadow-sm hover:shadow-md transition duration-300 relative flex flex-col justify-between group hover:border-gold"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-cream-200 border border-gold/40 flex items-center justify-center group-hover:scale-110 transition duration-300">
                  {step.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold-dark transition duration-200">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal">
                  {step.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-silk-taupe/40 flex items-center justify-between text-[11px] font-bold text-gold uppercase tracking-wider">
                <span>Step 0{idx + 1}</span>
                <span className="opacity-40 font-mono">GRETEL'S PLUG</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={() => openWhatsAppGeneralInquiry(whatsappNumber, "Custom Outfit Order Inquiry")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-md transition duration-300"
          >
            <span>Chat With Us on WhatsApp</span>
          </button>

          <button
            onClick={onOpenCustomDesignModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-md transition duration-300"
          >
            <Upload className="w-4 h-4" />
            <span>Send Your Own Outfit Photo</span>
          </button>
        </div>
      </div>
    </section>
  );
};
