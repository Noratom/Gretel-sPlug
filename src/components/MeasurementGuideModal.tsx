import React from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  const steps = [
    {
      title: "1. Shoulder",
      desc: "Measure across your back from the edge of your left shoulder bone to your right shoulder bone."
    },
    {
      title: "2. Bust / Chest",
      desc: "Measure around the fullest part of your bust or chest with tape kept flat across your back."
    },
    {
      title: "3. Nip-Nip (Apex Distance)",
      desc: "Measure the distance from one nipple point straight across to the other nipple point."
    },
    {
      title: "4. Bust Point",
      desc: "Measure from the top of your shoulder (neck base) straight down to your bust point/nipple."
    },
    {
      title: "5. Underbust",
      desc: "Measure around your ribcage directly beneath your bust line."
    },
    {
      title: "6. Half-Cut",
      desc: "Measure from the top of your shoulder down to your natural waistline."
    },
    {
      title: "7. Waist / Navel Point",
      desc: "Measure around your waistline directly across your navel (belly button)."
    },
    {
      title: "8. Hip",
      desc: "Stand with feet together and measure around the fullest part of your hips and seat."
    },
    {
      title: "9. Thigh",
      desc: "Measure around the fullest part of your upper thigh."
    },
    {
      title: "10. Height",
      desc: "Your total barefoot height from top of head to floor."
    },
    {
      title: "11. Total Length",
      desc: "Measure from top of shoulder down to your desired dress, gown, or pants hem length."
    },
    {
      title: "12. Sleeves",
      desc: "Measure from shoulder bone down your arm to your wrist or preferred sleeve length."
    },
    {
      title: "13. Sleeve Round Curve",
      desc: "Measure around the armhole / fullest part of your upper arm bicep curve."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-charcoal">
      <div className="bg-cream-100 w-full max-w-4xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Air_Luxe • Gretel's Plug Tailor Measurement Guide
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
              <strong>Atelier Fitting Tip:</strong> Use a soft tape measure in inches or cm. If you leave any blank, our tailors will gladly assist you line-by-line over WhatsApp!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-cream-200/50 p-4 rounded-xl border border-silk-taupe space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-base font-bold text-charcoal">{s.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  </div>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-charcoal text-silk-cream rounded-2xl text-center space-y-2">
            <h4 className="font-serif text-lg font-bold text-gold">Need Personalized Guidance?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              Send us a message on WhatsApp and our fitting team will guide you step-by-step!
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
