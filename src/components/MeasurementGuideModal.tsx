import React from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  const steps = [
    {
      title: "1. Bust / Chest",
      desc: "Measure around the fullest part of your chest or bust with a soft measuring tape flat across your back."
    },
    {
      title: "2. Natural Waist",
      desc: "Measure around your waistline (the narrowest point right above your belly button)."
    },
    {
      title: "3. Hips",
      desc: "Stand with your feet together and measure around the fullest part of your hips."
    },
    {
      title: "4. Shoulder Width",
      desc: "Measure across your upper back from the tip of your left shoulder to the tip of your right shoulder."
    },
    {
      title: "5. Sleeve Length",
      desc: "Measure from the tip of your shoulder down your arm to your wrist."
    },
    {
      title: "6. Total Height & Outfit Length",
      desc: "State your height without shoes and mention if you will wear high heels with your gown or pants."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-cream-100 w-full max-w-3xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto text-charcoal">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Gretel's Plug Size & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-cream-100/70 hover:text-gold p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="bg-cream-200 p-4 rounded-2xl border border-gold/30 flex items-center gap-3 text-xs text-charcoal">
            <Sparkles className="w-5 h-5 text-gold shrink-0" />
            <p className="font-medium">
              <strong>Quick Tip:</strong> Use a soft tape measure while wearing light clothes. If you're unsure about any size, simply send us a message on WhatsApp and we will help you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-cream-200/50 p-4 rounded-xl border border-silk-taupe space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-charcoal">{s.title}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-charcoal text-silk-cream rounded-2xl text-center space-y-2">
            <h4 className="font-serif text-lg font-bold text-gold">Need Help Measuring?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              Our tailors will guide you step-by-step on WhatsApp so your outfit fits perfectly!
            </p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-cream-200/80 border-t border-silk-taupe text-center">
          <button
            onClick={onClose}
            className="bg-charcoal text-cream-100 hover:bg-gold hover:text-charcoal px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition"
          >
            Got It, Return to Order
          </button>
        </div>
      </div>
    </div>
  );
};
