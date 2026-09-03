import React from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  const steps = [
    { num: 1, title: "Bust", desc: "Measure around the fullest part of the bust." },
    { num: 2, title: "Under Bust", desc: "Measure around the body directly under the bust." },
    { num: 3, title: "Waist", desc: "Measure around the natural waistline." },
    { num: 4, title: "High Hip", desc: "Measure around the body about 3-4 inches (7-10 cm) below waist." },
    { num: 5, title: "Hip (Full)", desc: "Measure around the fullest part of the hips and buttocks." },
    { num: 6, title: "Shoulder Width", desc: "Measure from the edge of one shoulder to the edge of the other." },
    { num: 7, title: "Back Width", desc: "Measure across the back from one side to the other, under shoulder blades." },
    { num: 8, title: "Front Length", desc: "Measure from highest point of shoulder, down over bust to waist." },
    { num: 9, title: "Back Length", desc: "Measure from base of neck, down center back to waist." },
    { num: 10, title: "Sleeve Length", desc: "Measure from top of shoulder, down over elbow to wrist bone." },
    { num: 11, title: "Armhole", desc: "Measure around armhole, over shoulder blade and under arm." },
    { num: 12, title: "Bicep", desc: "Measure around the fullest part of upper arm." },
    { num: 13, title: "Wrist", desc: "Measure around the wrist." },
    { num: 14, title: "Neck", desc: "Measure around the base of the neck." },
    { num: 15, title: "Waist to Hip", desc: "Measure from waist down to fullest part of hips." },
    { num: 16, title: "Waist to Knee", desc: "Measure from waist down to the knee." },
    { num: 17, title: "Waist to Ankle", desc: "Measure from waist down to the ankle." },
    { num: 18, title: "Crotch Length", desc: "Measure from waist, through crotch and back up to waist." },
    { num: 19, title: "Outseam Length", desc: "Measure from waist, down side of leg to ankle." },
    { num: 20, title: "Inseam Length", desc: "Measure from crotch down inside of leg to ankle." }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-charcoal">
      <div className="bg-cream-100 w-full max-w-5xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              How To Take Body Measurements • Air_Luxe (Gretel's Plug)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-cream-100/70 hover:text-gold p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Important Banner */}
          <div className="bg-cream-200 p-4 rounded-2xl border border-gold/30 flex items-center justify-between gap-4 text-xs text-charcoal">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold shrink-0" />
              <p className="font-medium">
                <strong>Important Tips:</strong> Always use a flexible measuring tape. Do not pull the tape too tight. Keep tape parallel to floor. Measure over light clothing while standing straight.
              </p>
            </div>
          </div>

          {/* Infographic Image Guide */}
          <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-md bg-white p-2">
            <img
              src="/measurement-guide.jpg"
              alt="How To Take Body Measurements Diagram"
              className="w-full h-auto max-h-[500px] object-contain rounded-xl mx-auto"
            />
          </div>

          {/* 20 Numbered Steps Breakdown Grid */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif text-xl font-bold text-charcoal">Measurement Reference Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {steps.map((s) => (
                <div key={s.num} className="bg-cream-200/50 p-3.5 rounded-xl border border-silk-taupe space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-charcoal">{s.num}. {s.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  </div>
                  <p className="text-[11px] text-charcoal/75 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-charcoal text-silk-cream rounded-2xl text-center space-y-1.5">
            <h4 className="font-serif text-lg font-bold text-gold">Need Help Measuring?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              You can leave any sizes blank if unsure—our fitting team on WhatsApp will gladly guide you!
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
