import React, { useState, useEffect } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, Table, Image as ImageIcon } from 'lucide-react';

interface MeasurementGuideModalProps {
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'size-chart' | 'measurement-diagram'>('size-chart');

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
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold text-cream-100">
              Air_Luxe (Gretel's Plug) • Size & Fitting Studio
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Sub-Tab Navigation Toggle */}
            <div className="flex bg-white/10 p-1 rounded-xl text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('size-chart')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'size-chart'
                    ? 'bg-gold text-charcoal shadow-sm font-extrabold'
                    : 'text-cream-100 hover:text-gold'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Standard Size Chart</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('measurement-diagram')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'measurement-diagram'
                    ? 'bg-gold text-charcoal shadow-sm font-extrabold'
                    : 'text-cream-100 hover:text-gold'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>20-Point Body Diagram</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-cream-100/70 hover:text-gold p-1.5 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Important Banner */}
          <div className="bg-cream-200 p-4 rounded-2xl border border-gold/30 flex items-center justify-between gap-4 text-xs text-charcoal">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold shrink-0" />
              <p className="font-medium">
                <strong>Fitting Tip:</strong> Switch between the <strong>Standard Size Chart (XS - 5XL)</strong> and the <strong>20-Point Body Measurement Diagram</strong> below. You can order using standard sizes or custom body numbers!
              </p>
            </div>
          </div>

          {/* TAB 1: Compartmentalized Standard Size Chart Table */}
          {activeTab === 'size-chart' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-silk-taupe pb-3">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-charcoal">Standard Size Chart (XS to 5XL)</h4>
                  <p className="text-xs text-charcoal/70">Official standard dimensions for skirts, dresses, and outfits</p>
                </div>
                <span className="text-xs text-gold-dark font-sans uppercase font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  XS — 5XL TABLE
                </span>
              </div>

              {/* Full-width clean size table */}
              <div className="overflow-x-auto rounded-2xl border border-gold/40 shadow-md bg-cream-100">
                <table className="w-full text-xs text-left">
                  <thead className="bg-charcoal text-gold font-bold uppercase tracking-wider text-[12px] border-b border-gold/40">
                    <tr>
                      <th className="py-4 px-6">Size</th>
                      <th className="py-4 px-6">Waist Circumference (Inches)</th>
                      <th className="py-4 px-6">Hips Circumference (Inches)</th>
                      <th className="py-4 px-6">Outfit Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-silk-taupe/60 font-semibold text-charcoal text-sm">
                    {standardSizeChart.map((row, idx) => (
                      <tr 
                        key={row.size} 
                        className={`transition ${idx % 2 === 0 ? 'bg-cream-100' : 'bg-cream-200/40'} hover:bg-gold/15`}
                      >
                        <td className="py-3.5 px-6 font-extrabold text-gold-dark font-serif text-base">{row.size}</td>
                        <td className="py-3.5 px-6 font-medium">{row.waist}</td>
                        <td className="py-3.5 px-6 font-medium">{row.hips}</td>
                        <td className="py-3.5 px-6 font-medium">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Compartmentalized Full-Resolution 20-Point Body Measurement Guide */}
          {activeTab === 'measurement-diagram' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-silk-taupe pb-3">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-charcoal">20-Point Body Measurement Guide</h4>
                  <p className="text-xs text-charcoal/70">Full-resolution visual guide showing exact tape placement</p>
                </div>
                <span className="text-xs text-gold-dark font-sans uppercase font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  FULL RESOLUTION DIAGRAM
                </span>
              </div>

              {/* Full Resolution Diagram Image Container */}
              <div className="rounded-3xl overflow-hidden border-2 border-gold/40 shadow-xl bg-white p-3 sm:p-4">
                <img
                  src="/measurement-guide.jpg"
                  alt="How To Take Body Measurements Full Resolution Diagram"
                  className="w-full h-auto object-contain rounded-2xl mx-auto shadow-xs"
                />
              </div>

              {/* 20 Numbered Steps Breakdown Grid */}
              <div className="space-y-3 pt-2">
                <h5 className="font-serif text-xl font-bold text-charcoal">20 Measurement Step Definitions</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {steps.map((s) => (
                    <div key={s.num} className="bg-cream-200/60 p-3.5 rounded-2xl border border-silk-taupe space-y-1 hover:border-gold transition">
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
            </div>
          )}

          <div className="p-4 bg-charcoal text-silk-cream rounded-2xl text-center space-y-1.5 shadow-md">
            <h4 className="font-serif text-lg font-bold text-gold">Need Personalized Assistance?</h4>
            <p className="text-xs text-silk-cream/80 max-w-md mx-auto">
              Our tailors are available on WhatsApp to guide you line-by-line!
            </p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-cream-200/80 border-t border-silk-taupe flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-charcoal/70">
            <span>Viewing:</span>
            <span className="text-gold-dark font-extrabold uppercase">
              {activeTab === 'size-chart' ? 'Standard Size Chart (XS - 5XL)' : '20-Point Body Diagram'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="bg-charcoal text-cream-100 hover:bg-gold hover:text-charcoal px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
