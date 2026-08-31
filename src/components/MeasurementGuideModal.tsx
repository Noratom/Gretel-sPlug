import React from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  const steps = [
    {
      title: "1. Bust / Chest",
      desc: "Measure around the fullest part of your bust, keeping the measuring tape horizontal and comfortably flat across your back."
    },
    {
      title: "2. Natural Waist",
      desc: "Measure around your natural waistline (the narrowest point above your belly button). Keep one finger between your body and the tape."
    },
    {
      title: "3. Hips",
      desc: "Stand with feet together and measure around the fullest part of your hips and seat (approximately 8 inches below your waist)."
    },
    {
      title: "4. Shoulder Width",
      desc: "Measure across your back from the edge of your left shoulder bone to the edge of your right shoulder bone."
    },
    {
      title: "5. Sleeve Length",
      desc: "Measure from the tip of your shoulder down along your arm to your wrist bone with a slight bend in your elbow."
    },
    {
      title: "6. Total Height & Outfit Length",
      desc: "State your total barefoot height plus the heel height you intend to wear with your custom gown or tailored trousers."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-cream-100 w-full max-w-3xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Air_Luxe Master Fitting & Measurement Guide
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
              <strong>Atelier Tip:</strong> For the most flawless drape, use a soft fabric measuring tape and wear thin undergarments during measurement. If you prefer, our tailors will gladly guide you line-by-line over WhatsApp!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-cream-200/50 p-4 rounded-xl border border-silk-taupe space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-charcoal">{s.title}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-charcoal text-silk-cream rounded-2xl text-center space-y-2">
            <h4 className="font-serif text-lg font-bold text-gold">Need Personalized Guidance?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              Our tailors offer live video consultations on WhatsApp to ensure your measurements are 100% precise before crafting begins.
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
