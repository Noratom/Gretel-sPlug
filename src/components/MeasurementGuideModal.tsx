import React, { useEffect } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  // Handle ESC key press to close cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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

  const standardSizeChart = [
    { size: "XS", waist: "24 - 25 in", hips: "34 - 35 in", length: "20 - 21 in" },
    { size: "S", waist: "26 - 27 in", hips: "36 - 37 in", length: "20 - 21 in" },
    { size: "M", waist: "28 - 29 in", hips: "38 - 39 in", length: "21 - 22 in" },
    { size: "L", waist: "30 - 31 in", hips: "40 - 41 in", length: "22 - 23 in" },
    { size: "XL", waist: "32 - 34 in", hips: "42 - 44 in", length: "22 - 23 in" },
    { size: "2XL", waist: "35 - 37 in", hips: "45 - 47 in", length: "23 - 24 in" },
    { size: "3XL", waist: "38 - 40 in", hips: "48 - 50 in", length: "23 - 24 in" },
    { size: "4XL", waist: "41 - 43 in", hips: "51 - 53 in", length: "24 - 25 in" },
    { size: "5XL", waist: "44 - 46 in", hips: "54 - 56 in", length: "25 - 26 in" }
  ];

  return (
    <div 
      className="fixed inset-0 z-[70] overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-charcoal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-cream-100 w-full max-w-5xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Air_Luxe (Gretel's Plug) • Size & Measurement Diagrams
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Important Banner */}
          <div className="bg-cream-200 p-4 rounded-2xl border border-gold/30 flex items-center justify-between gap-4 text-xs text-charcoal">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold shrink-0" />
              <p className="font-medium">
                <strong>Tips:</strong> Stand straight, use a flexible tape, and measure over light clothing. You can use standard sizes (XS - 5XL) or enter your exact custom body numbers!
              </p>
            </div>
          </div>

          {/* Section 1: Standard Skirt & Outfit Size Chart Table */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl font-bold text-charcoal border-b border-silk-taupe pb-2 flex items-center justify-between">
              <span>Standard Size Chart (XS to 5XL)</span>
              <span className="text-xs text-gold-dark font-sans uppercase font-bold">Official Size Table</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Size Table */}
              <div className="overflow-x-auto rounded-2xl border border-gold/40 shadow-sm bg-cream-200/60">
                <table className="w-full text-xs text-left">
                  <thead className="bg-charcoal text-gold font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Waist (in)</th>
                      <th className="py-3 px-4">Hips (in)</th>
                      <th className="py-3 px-4">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-silk-taupe/60 font-semibold text-charcoal">
                    {standardSizeChart.map((row) => (
                      <tr key={row.size} className="hover:bg-gold/10 transition">
                        <td className="py-2.5 px-4 font-bold text-gold-dark">{row.size}</td>
                        <td className="py-2.5 px-4">{row.waist}</td>
                        <td className="py-2.5 px-4">{row.hips}</td>
                        <td className="py-2.5 px-4">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Chart Image */}
              <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-md bg-white p-2 text-center">
                <img
                  src="/skirt-size-chart.jpg"
                  alt="Female Skirt Size Chart"
                  className="w-full h-auto max-h-[350px] object-contain rounded-xl mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Section 2: 20 Body Measurements Diagram & Details */}
          <div className="space-y-4 pt-4 border-t border-silk-taupe/60">
            <h4 className="font-serif text-2xl font-bold text-charcoal border-b border-silk-taupe pb-2 flex items-center justify-between">
              <span>20-Point Body Measurement Guide</span>
              <span className="text-xs text-gold-dark font-sans uppercase font-bold">Visual Diagram</span>
            </h4>

            {/* Infographic Image Guide */}
            <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-md bg-white p-2">
              <img
                src="/measurement-guide.jpg"
                alt="How To Take Body Measurements Diagram"
                className="w-full h-auto max-h-[480px] object-contain rounded-xl mx-auto"
              />
            </div>

            {/* 20 Numbered Steps Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {steps.map((s) => (
                <div key={s.num} className="bg-cream-200/50 p-3 rounded-xl border border-silk-taupe space-y-1">
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
            <h4 className="font-serif text-lg font-bold text-gold">Need Personalized Assistance?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              Our tailors are available on WhatsApp to guide you line-by-line!
            </p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-cream-200/80 border-t border-silk-taupe text-center">
          <button
            onClick={onClose}
            className="bg-charcoal text-cream-100 hover:bg-gold hover:text-charcoal px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
