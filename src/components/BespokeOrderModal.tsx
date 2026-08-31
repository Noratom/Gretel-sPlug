import React, { useState, useEffect } from 'react';
import { BespokeDesign, FabricOption, SizeMode, CustomMeasurements, BespokeOrderState } from '../types/bespoke';
import { X, MessageCircle, Ruler, Sparkles, CheckCircle2, ShieldCheck, Clock, Layers } from 'lucide-react';
import { openWhatsAppOrder } from '../utils/whatsapp';

interface BespokeOrderModalProps {
  design: BespokeDesign | null;
  whatsappNumber?: string;
  onClose: () => void;
  onOpenMeasurementGuide: () => void;
}

export const BespokeOrderModal: React.FC<BespokeOrderModalProps> = ({
  design,
  whatsappNumber,
  onClose,
  onOpenMeasurementGuide
}) => {
  if (!design) return null;

  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(design.fabrics[0]);
  const [sizeMode, setSizeMode] = useState<SizeMode>('custom');
  const [standardSize, setStandardSize] = useState<string>('M');

  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bustChest: '',
    waist: '',
    hips: '',
    shoulderWidth: '',
    sleeveLength: '',
    totalHeight: '',
    desiredOutfitLength: '',
    additionalNotes: ''
  });

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [fittingDatePreference, setFittingDatePreference] = useState('');

  useEffect(() => {
    if (design && design.fabrics.length > 0) {
      setSelectedFabric(design.fabrics[0]);
    }
  }, [design]);

  const handleInputChange = (field: keyof CustomMeasurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderState: BespokeOrderState = {
      design,
      selectedFabric,
      sizeMode,
      standardSize,
      measurements,
      clientName,
      clientPhone,
      fittingDatePreference
    };
    openWhatsAppOrder(orderState, whatsappNumber);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-cream-100 w-full max-w-4xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold overflow-hidden">
              <img src="/logo.jpg" alt="Air_Luxe emblem" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cream-100 flex items-center gap-2">
                <span>Bespoke Consultation & Order</span>
                <span className="text-gold text-xs font-sans tracking-widest font-normal uppercase hidden sm:inline">| Air_Luxe</span>
              </h3>
              <p className="text-[10px] text-gold tracking-widest uppercase">Gretel's Plug 2020 • Est 2020</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-cream-100/70 hover:text-gold p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleOrderSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Design Overview Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-cream-200/80 p-5 rounded-2xl border border-silk-taupe">
            <img
              src={design.mainImage}
              alt={design.title}
              className="w-24 h-32 object-cover rounded-xl border border-gold/40 shadow-sm"
            />
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded-full inline-block">
                {design.category}
              </span>
              <h4 className="font-serif text-2xl font-bold text-charcoal">{design.title}</h4>
              <p className="text-xs text-charcoal/70">{design.tagline}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold text-charcoal">
                <span className="text-gold-dark">Est. Price: {design.priceRange}</span>
                <span className="text-charcoal/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {design.craftingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Fabric Selection */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gold" />
                1. Select Atelier Fabric
              </span>
              <span className="text-[11px] font-medium text-gold-dark">Included in custom fitting</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {design.fabrics.map((fabric) => {
                const isSelected = selectedFabric.id === fabric.id;
                return (
                  <button
                    type="button"
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${
                      isSelected
                        ? 'border-gold bg-cream-200 ring-2 ring-gold/20 shadow-xs'
                        : 'border-silk-taupe bg-cream-100 hover:bg-cream-200/50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-charcoal/30 shadow-xs shrink-0"
                      style={{ backgroundColor: fabric.colorHex }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-charcoal truncate">{fabric.name}</div>
                      <div className="text-[10px] text-charcoal/60 truncate">{fabric.texture}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Size & Body Measurements Toggle */}
          <div className="space-y-4 pt-2 border-t border-silk-taupe/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-gold" />
                2. Fit & Measurement Profile
              </label>

              <button
                type="button"
                onClick={onOpenMeasurementGuide}
                className="text-[11px] font-bold text-gold-dark hover:underline flex items-center gap-1"
              >
                <span>How to measure yourself</span>
              </button>
            </div>

            {/* Toggle Mode Buttons */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-cream-200 rounded-xl border border-silk-taupe">
              <button
                type="button"
                onClick={() => setSizeMode('custom')}
                className={`py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                  sizeMode === 'custom'
                    ? 'bg-charcoal text-cream-100 shadow-sm'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                ✨ Custom Measurements (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('standard')}
                className={`py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                  sizeMode === 'standard'
                    ? 'bg-charcoal text-cream-100 shadow-sm'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                Standard Size (XS - XXL)
              </button>
            </div>

            {/* Standard Size Selector */}
            {sizeMode === 'standard' ? (
              <div className="p-4 bg-cream-200/50 rounded-xl border border-silk-taupe space-y-3">
                <span className="text-xs font-bold text-charcoal block">Choose Standard Size:</span>
                <div className="flex flex-wrap gap-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setStandardSize(sz)}
                      className={`w-12 h-10 rounded-lg text-xs font-bold transition border ${
                        standardSize === sz
                          ? 'bg-gold text-charcoal border-gold shadow-sm'
                          : 'bg-cream-100 text-charcoal border-silk-taupe hover:border-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-charcoal/60 italic">
                  Note: Standard sizes will be tailored according to European luxury sizing guidelines.
                </p>
              </div>
            ) : (
              /* Custom Body Measurements Form Grid */
              <div className="p-5 bg-cream-200/50 rounded-2xl border border-silk-taupe space-y-4">
                <p className="text-xs font-semibold text-charcoal/80">
                  Enter your measurements in inches or cm (leave any blank if unsure, master tailors will confirm via WhatsApp):
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Bust / Chest</label>
                    <input
                      type="text"
                      placeholder="e.g. 36 in"
                      value={measurements.bustChest}
                      onChange={(e) => handleInputChange('bustChest', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Waist</label>
                    <input
                      type="text"
                      placeholder="e.g. 28 in"
                      value={measurements.waist}
                      onChange={(e) => handleInputChange('waist', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Hips</label>
                    <input
                      type="text"
                      placeholder="e.g. 40 in"
                      value={measurements.hips}
                      onChange={(e) => handleInputChange('hips', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Shoulder Width</label>
                    <input
                      type="text"
                      placeholder="e.g. 15.5 in"
                      value={measurements.shoulderWidth}
                      onChange={(e) => handleInputChange('shoulderWidth', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Sleeve Length</label>
                    <input
                      type="text"
                      placeholder="e.g. 24 in"
                      value={measurements.sleeveLength}
                      onChange={(e) => handleInputChange('sleeveLength', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Total Height</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 ft 8 in"
                      value={measurements.totalHeight}
                      onChange={(e) => handleInputChange('totalHeight', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Desired Outfit Length / Heels</label>
                    <input
                      type="text"
                      placeholder="e.g. Floor length with 4-inch heels"
                      value={measurements.desiredOutfitLength}
                      onChange={(e) => handleInputChange('desiredOutfitLength', e.target.value)}
                      className="w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Notes & Client Info */}
          <div className="space-y-4 pt-2 border-t border-silk-taupe/60">
            <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal block">
              3. Customization Request & Client Info
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lady Katherine"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Preferred Target Event / Delivery Date</label>
                <input
                  type="text"
                  placeholder="e.g. October 15 Gala"
                  value={fittingDatePreference}
                  onChange={(e) => setFittingDatePreference(e.target.value)}
                  className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Additional Style Notes / Modifications</label>
              <textarea
                rows={2}
                placeholder="e.g. Please add a higher neckline or matching silk waist belt..."
                value={measurements.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-silk-taupe flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-charcoal/70">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Direct 1-on-1 consultation with Air_Luxe master tailors</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-dark text-charcoal px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg transition duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Send Order via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
