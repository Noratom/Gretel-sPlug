import React, { useState, useRef } from 'react';
import { CustomDesignRequestState, CustomMeasurements, SizeMode } from '../types/bespoke';
import { X, Upload, MessageCircle, Ruler, Sparkles, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';
import { openCustomDesignWhatsAppRequest } from '../utils/whatsapp';

interface CustomDesignModalProps {
  whatsappNumber: string;
  onClose: () => void;
  onOpenMeasurementGuide: () => void;
}

export const CustomDesignModal: React.FC<CustomDesignModalProps> = ({
  whatsappNumber,
  onClose,
  onOpenMeasurementGuide
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [fabricPreference, setFabricPreference] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<string>('');
  const [neededDate, setNeededDate] = useState<string>('');

  const [sizeMode, setSizeMode] = useState<SizeMode>('custom');
  const [standardSize, setStandardSize] = useState<string>('M');

  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    shoulder: '',
    bustChest: '',
    nipToNip: '',
    bustPoint: '',
    underbust: '',
    halfCut: '',
    waistNavel: '',
    hip: '',
    thigh: '',
    totalHeight: '',
    totalLength: '',
    sleeves: '',
    sleeveRoundCurve: '',
    additionalNotes: ''
  });

  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImageFile(file);
        setPhotoPreview(compressedBase64);
      } catch (err) {
        console.error('Error compressing image', err);
      }
    }
  };

  const handleInputChange = (field: keyof CustomMeasurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description && !photoPreview) {
      alert('Please write a short description or upload a photo of the outfit design you want us to make.');
      return;
    }

    const requestState: CustomDesignRequestState = {
      photoPreview,
      description,
      fabricPreference,
      sizeMode,
      standardSize,
      measurements,
      budgetRange,
      neededDate,
      clientName,
      clientPhone
    };

    openCustomDesignWhatsAppRequest(requestState, whatsappNumber);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-charcoal">
      <div className="bg-cream-100 w-full max-w-4xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto text-charcoal">
        {/* Header Bar */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold overflow-hidden">
              <img src="/logo.jpg" alt="Air_Luxe logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cream-100">
                Send Your Own Outfit Design
              </h3>
              <p className="text-[10px] text-gold tracking-widest uppercase">Air_Luxe • Gretel's Plug Custom Studio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-cream-100/70 hover:text-gold p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Hidden File Picker Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="bg-cream-200/80 p-4 rounded-2xl border border-silk-taupe flex items-center gap-3 text-xs text-charcoal">
            <Sparkles className="w-5 h-5 text-gold shrink-0" />
            <p className="font-medium">
              Got a picture of an outfit you saw online or drew yourself? Upload your photo below and we will make it for you!
            </p>
          </div>

          {/* Section 1: Upload Photo or Describe */}
          <div className="space-y-4">
            <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-gold" />
              1. Upload Your Outfit Photo / Sketch
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-cream-200/50 p-4 rounded-2xl border border-silk-taupe">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Picture from Gallery</span>
              </button>

              {photoPreview ? (
                <div className="flex items-center gap-3">
                  <img
                    src={photoPreview}
                    alt="Uploaded design"
                    className="w-16 h-20 object-cover rounded-xl border-2 border-gold shadow-md"
                  />
                  <span className="text-xs font-bold text-green-700">Photo Attached!</span>
                </div>
              ) : (
                <span className="text-xs text-charcoal/60">No photo selected yet</span>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">
                Describe the design you want us to make
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Long green lace gown with off-shoulder sleeves and a thigh slit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Fabric & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-silk-taupe/60">
            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Fabric & Color Preference</label>
              <input
                type="text"
                placeholder="e.g. Velvet, Silk, Cotton, Satin, Royal Blue..."
                value={fabricPreference}
                onChange={(e) => setFabricPreference(e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Your Budget Range</label>
              <input
                type="text"
                placeholder="e.g. ₦60,000 - ₦100,000"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Body Sizing & Measurements */}
          <div className="space-y-4 pt-2 border-t border-silk-taupe/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-gold" />
                2. Body Measurements Profile
              </label>

              <button
                type="button"
                onClick={onOpenMeasurementGuide}
                className="text-[11px] font-bold text-gold-dark hover:underline flex items-center gap-1"
              >
                <span>Size Guide</span>
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-cream-200 rounded-xl border border-silk-taupe">
              <button
                type="button"
                onClick={() => setSizeMode('custom')}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                  sizeMode === 'custom' ? 'bg-charcoal text-cream-100' : 'text-charcoal/70'
                }`}
              >
                Custom Measurements
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('standard')}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                  sizeMode === 'standard' ? 'bg-charcoal text-cream-100' : 'text-charcoal/70'
                }`}
              >
                Standard Size (XS - XXL)
              </button>
            </div>

            {sizeMode === 'standard' ? (
              <div className="p-4 bg-cream-200/50 rounded-xl border border-silk-taupe space-y-2">
                <span className="text-xs font-bold block">Choose Standard Size:</span>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setStandardSize(sz)}
                      className={`w-10 h-9 rounded-lg text-xs font-bold transition border ${
                        standardSize === sz ? 'bg-gold text-charcoal border-gold' : 'bg-cream-100 border-silk-taupe'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* All 13 Tailor Measurement Inputs */
              <div className="p-4 bg-cream-200/50 rounded-2xl border border-silk-taupe grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">1. Shoulder</label>
                  <input
                    type="text"
                    placeholder="e.g. 15.5 in"
                    value={measurements.shoulder}
                    onChange={(e) => handleInputChange('shoulder', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">2. Bust / Chest</label>
                  <input
                    type="text"
                    placeholder="e.g. 36 in"
                    value={measurements.bustChest}
                    onChange={(e) => handleInputChange('bustChest', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">3. Nip-Nip</label>
                  <input
                    type="text"
                    placeholder="e.g. 7.5 in"
                    value={measurements.nipToNip}
                    onChange={(e) => handleInputChange('nipToNip', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">4. Bust Point</label>
                  <input
                    type="text"
                    placeholder="e.g. 10.5 in"
                    value={measurements.bustPoint}
                    onChange={(e) => handleInputChange('bustPoint', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">5. Underbust</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 in"
                    value={measurements.underbust}
                    onChange={(e) => handleInputChange('underbust', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">6. Half-Cut</label>
                  <input
                    type="text"
                    placeholder="e.g. 16 in"
                    value={measurements.halfCut}
                    onChange={(e) => handleInputChange('halfCut', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">7. Waist / Navel</label>
                  <input
                    type="text"
                    placeholder="e.g. 28 in"
                    value={measurements.waistNavel}
                    onChange={(e) => handleInputChange('waistNavel', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">8. Hip</label>
                  <input
                    type="text"
                    placeholder="e.g. 40 in"
                    value={measurements.hip}
                    onChange={(e) => handleInputChange('hip', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">9. Thigh</label>
                  <input
                    type="text"
                    placeholder="e.g. 23 in"
                    value={measurements.thigh}
                    onChange={(e) => handleInputChange('thigh', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">10. Height</label>
                  <input
                    type="text"
                    placeholder="e.g. 5ft 8in"
                    value={measurements.totalHeight}
                    onChange={(e) => handleInputChange('totalHeight', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">11. Total Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 60 in"
                    value={measurements.totalLength}
                    onChange={(e) => handleInputChange('totalLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">12. Sleeves</label>
                  <input
                    type="text"
                    placeholder="e.g. 24 in"
                    value={measurements.sleeves}
                    onChange={(e) => handleInputChange('sleeves', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2 sm:col-span-3 lg:col-span-4">
                  <label className="text-[10px] font-bold uppercase block mb-1">13. Sleeve Round Curve (Armhole/Bicep)</label>
                  <input
                    type="text"
                    placeholder="e.g. 13.5 in"
                    value={measurements.sleeveRoundCurve}
                    onChange={(e) => handleInputChange('sleeveRoundCurve', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Customer Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-silk-taupe/60">
            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Mary"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-charcoal uppercase block mb-1">Needed Delivery Date</label>
              <input
                type="text"
                placeholder="e.g. Next Friday"
                value={neededDate}
                onChange={(e) => setNeededDate(e.target.value)}
                className="w-full bg-cream-100 border border-silk-taupe px-3.5 py-2.5 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-silk-taupe flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-charcoal/70">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Direct WhatsApp message sent to Gretel's Plug tailors</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-dark text-charcoal px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Send Request on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
