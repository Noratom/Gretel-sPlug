import React, { useState, useRef } from 'react';
import { CustomDesignRequestState, CustomMeasurements, SizeMode } from '../types/bespoke';
import { X, Upload, MessageCircle, Ruler, Sparkles, Image as ImageIcon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';
import { openCustomDesignWhatsAppRequest } from '../utils/whatsapp';

interface CustomDesignModalProps {
  whatsappNumber: string;
  onClose: () => void;
  onOpenMeasurementGuide: () => void;
}

const AIR_LUXE_UK_SIZES = [
  { ukSize: 'UK 4', bust: '30"', waist: '23"', hip: '33"' },
  { ukSize: 'UK 6', bust: '32"', waist: '25"', hip: '35"' },
  { ukSize: 'UK 8', bust: '34"', waist: '27"', hip: '37"' },
  { ukSize: 'UK 10', bust: '36"', waist: '29"', hip: '39"' },
  { ukSize: 'UK 12', bust: '38"', waist: '31"', hip: '41"' },
  { ukSize: 'UK 14', bust: '40"', waist: '33"', hip: '43"' },
  { ukSize: 'UK 16', bust: '42"', waist: '35"', hip: '45"' },
  { ukSize: 'UK 18', bust: '44"', waist: '37"', hip: '47"' },
  { ukSize: 'UK 20', bust: '46"', waist: '39"', hip: '49"' }
];

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
  const [standardSize, setStandardSize] = useState<string>('UK 10');

  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: '',
    underBust: '',
    waist: '',
    highHip: '',
    hipFull: '',
    shoulderWidth: '',
    backWidth: '',
    frontLength: '',
    backLength: '',
    sleeveLength: '',
    armhole: '',
    bicep: '',
    wrist: '',
    neck: '',
    waistToHip: '',
    waistToKnee: '',
    waistToAnkle: '',
    crotchLength: '',
    outseamLength: '',
    inseamLength: '',
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
              <p className="text-[10px] text-gold tracking-widest uppercase">Air_Luxe • Gretel's Plug EST 2020 • Custom Studio</p>
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

          {/* Section 3: Body Sizing & 20 Measurements */}
          <div className="space-y-4 pt-2 border-t border-silk-taupe/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-gold" />
                2. Body Sizing & Measurements
              </label>

              <button
                type="button"
                onClick={onOpenMeasurementGuide}
                className="text-xs font-extrabold text-gold-dark hover:underline flex items-center gap-1.5 bg-gold/15 px-3 py-1.5 rounded-lg border border-gold/40"
              >
                <Ruler className="w-3.5 h-3.5 text-gold-dark" />
                <span>View Air_Luxe Size Chart & Diagram</span>
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
                Air_Luxe UK Size Chart (UK 4 - 20)
              </button>
            </div>

            {sizeMode === 'standard' ? (
              <div className="p-4 bg-cream-200/50 rounded-2xl border border-silk-taupe space-y-3">
                <span className="text-xs font-bold block">Select Official Air_Luxe UK Size (All in Inches):</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5">
                  {AIR_LUXE_UK_SIZES.map((item) => {
                    const isSelected = standardSize === item.ukSize;
                    return (
                      <button
                        type="button"
                        key={item.ukSize}
                        onClick={() => setStandardSize(item.ukSize)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gold text-charcoal border-gold font-bold shadow-sm ring-2 ring-gold/30'
                            : 'bg-cream-100 text-charcoal border-silk-taupe hover:border-gold'
                        }`}
                      >
                        <div className="flex items-center justify-between font-extrabold text-sm mb-1">
                          <span>{item.ukSize}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-charcoal" />}
                        </div>
                        <div className="text-[10px] space-y-0.5 opacity-90">
                          <div>Bust: {item.bust}</div>
                          <div>Waist: {item.waist}</div>
                          <div>Hip: {item.hip}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* All 20 Visual Chart Measurement Inputs */
              <div className="p-4 bg-cream-200/50 rounded-2xl border border-silk-taupe grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] font-bold block mb-1">1. Bust</label>
                  <input
                    type="text"
                    placeholder="e.g. 36 in"
                    value={measurements.bust}
                    onChange={(e) => handleInputChange('bust', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">2. Under Bust</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 in"
                    value={measurements.underBust}
                    onChange={(e) => handleInputChange('underBust', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">3. Waist</label>
                  <input
                    type="text"
                    placeholder="e.g. 28 in"
                    value={measurements.waist}
                    onChange={(e) => handleInputChange('waist', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">4. High Hip</label>
                  <input
                    type="text"
                    placeholder="e.g. 34 in"
                    value={measurements.highHip}
                    onChange={(e) => handleInputChange('highHip', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">5. Hip (Full)</label>
                  <input
                    type="text"
                    placeholder="e.g. 40 in"
                    value={measurements.hipFull}
                    onChange={(e) => handleInputChange('hipFull', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">6. Shoulder Width</label>
                  <input
                    type="text"
                    placeholder="e.g. 15.5 in"
                    value={measurements.shoulderWidth}
                    onChange={(e) => handleInputChange('shoulderWidth', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">7. Back Width</label>
                  <input
                    type="text"
                    placeholder="e.g. 14 in"
                    value={measurements.backWidth}
                    onChange={(e) => handleInputChange('backWidth', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">8. Front Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 16.5 in"
                    value={measurements.frontLength}
                    onChange={(e) => handleInputChange('frontLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">9. Back Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 in"
                    value={measurements.backLength}
                    onChange={(e) => handleInputChange('backLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">10. Sleeve Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 24 in"
                    value={measurements.sleeveLength}
                    onChange={(e) => handleInputChange('sleeveLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">11. Armhole</label>
                  <input
                    type="text"
                    placeholder="e.g. 17 in"
                    value={measurements.armhole}
                    onChange={(e) => handleInputChange('armhole', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">12. Bicep</label>
                  <input
                    type="text"
                    placeholder="e.g. 13 in"
                    value={measurements.bicep}
                    onChange={(e) => handleInputChange('bicep', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">13. Wrist</label>
                  <input
                    type="text"
                    placeholder="e.g. 7 in"
                    value={measurements.wrist}
                    onChange={(e) => handleInputChange('wrist', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">14. Neck</label>
                  <input
                    type="text"
                    placeholder="e.g. 14 in"
                    value={measurements.neck}
                    onChange={(e) => handleInputChange('neck', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">15. Waist to Hip</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 in"
                    value={measurements.waistToHip}
                    onChange={(e) => handleInputChange('waistToHip', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">16. Waist to Knee</label>
                  <input
                    type="text"
                    placeholder="e.g. 23 in"
                    value={measurements.waistToKnee}
                    onChange={(e) => handleInputChange('waistToKnee', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">17. Waist to Ankle</label>
                  <input
                    type="text"
                    placeholder="e.g. 40 in"
                    value={measurements.waistToAnkle}
                    onChange={(e) => handleInputChange('waistToAnkle', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">18. Crotch Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 26 in"
                    value={measurements.crotchLength}
                    onChange={(e) => handleInputChange('crotchLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">19. Outseam Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 42 in"
                    value={measurements.outseamLength}
                    onChange={(e) => handleInputChange('outseamLength', e.target.value)}
                    className="w-full bg-cream-100 border border-silk-taupe px-2.5 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1">20. Inseam Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 31 in"
                    value={measurements.inseamLength}
                    onChange={(e) => handleInputChange('inseamLength', e.target.value)}
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
