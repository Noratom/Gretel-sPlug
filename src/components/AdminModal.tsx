import React, { useState, useRef } from 'react';
import { BespokeDesign, Category } from '../types/bespoke';
import { X, Plus, Trash2, Edit3, Save, Sparkles, Settings, MessageCircle, Lock, Upload, Image as ImageIcon } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

interface AdminModalProps {
  designs: BespokeDesign[];
  onSaveDesigns: (updatedDesigns: BespokeDesign[]) => void;
  whatsappNumber: string;
  onSaveWhatsappNumber: (newNumber: string) => void;
  adminPin: string;
  onSaveAdminPin: (newPin: string) => void;
  onClose: () => void;
}

const CATEGORIES: Category[] = [
  'Dresses & Gowns',
  'Suits & Sets',
  'Silk & Loungewear',
  'Special Occasion',
  'Jackets & Coats'
];

export const AdminModal: React.FC<AdminModalProps> = ({
  designs,
  onSaveDesigns,
  whatsappNumber,
  onSaveWhatsappNumber,
  adminPin,
  onSaveAdminPin,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingDesign, setEditingDesign] = useState<BespokeDesign | null>(null);
  const [phoneInput, setPhoneInput] = useState(whatsappNumber);
  const [pinInput, setPinInput] = useState(adminPin);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState<Partial<BespokeDesign>>({
    title: '',
    category: 'Dresses & Gowns',
    tagline: '',
    description: '',
    priceRange: '₦60,000 - ₦100,000',
    craftingTime: '5 - 7 Days',
    mainImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    isNewArrival: true,
    fabrics: [
      { id: 'f_new_1', name: 'Silk Satin', texture: 'Smooth sheen', colorHex: '#C5A059' }
    ],
    details: ['Hand-fitted waist', 'Tailored to your exact measurements']
  });

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const compressedBase64 = await compressImageFile(file);
        setFormData(prev => ({
          ...prev,
          mainImage: compressedBase64,
          galleryImages: [compressedBase64, ...(prev.galleryImages || [])]
        }));
      } catch (err) {
        console.error('Failed to process image file', err);
        alert('Could not load image file. Please try another photo.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleStartNew = () => {
    setEditingDesign(null);
    setFormData({
      id: `gretel-${Date.now()}`,
      title: '',
      category: 'Dresses & Gowns',
      tagline: '',
      description: '',
      priceRange: '₦60,000 - ₦100,000',
      craftingTime: '5 - 7 Days',
      mainImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      galleryImages: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'],
      isFeatured: false,
      isNewArrival: true,
      fabrics: [
        { id: `f_${Date.now()}`, name: 'Silk Satin', texture: 'Smooth sheen', colorHex: '#C5A059' }
      ],
      details: ['Hand-fitted waist', 'Tailored to your exact measurements']
    });
  };

  const handleStartEdit = (design: BespokeDesign) => {
    setEditingDesign(design);
    setFormData({ ...design });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this outfit design?')) {
      const updated = designs.filter(d => d.id !== id);
      onSaveDesigns(updated);
      if (editingDesign?.id === id) {
        setEditingDesign(null);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.mainImage) {
      alert('Please enter an outfit title and upload a photo.');
      return;
    }

    const newDesignItem: BespokeDesign = {
      id: formData.id || `gretel-${Date.now()}`,
      title: formData.title || 'Untitled Custom Outfit',
      category: (formData.category as Category) || 'Dresses & Gowns',
      tagline: formData.tagline || '',
      description: formData.description || '',
      basePriceUSD: 500,
      priceRange: formData.priceRange || '₦50,000 - ₦100,000',
      craftingTime: formData.craftingTime || '5 - 7 Days',
      mainImage: formData.mainImage || '',
      galleryImages: formData.galleryImages || [formData.mainImage || ''],
      fabrics: formData.fabrics || [],
      isFeatured: formData.isFeatured || false,
      isNewArrival: formData.isNewArrival || false,
      details: formData.details || ['Tailored to exact fit']
    };

    let updatedList: BespokeDesign[];
    if (editingDesign) {
      updatedList = designs.map(d => (d.id === editingDesign.id ? newDesignItem : d));
    } else {
      updatedList = [newDesignItem, ...designs];
    }

    onSaveDesigns(updatedList);
    alert(editingDesign ? 'Outfit updated successfully!' : 'New outfit added!');
    handleStartNew();
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWhatsappNumber(phoneInput);
    onSaveAdminPin(pinInput);
    alert('WhatsApp contact number and passcode updated!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-cream-100 w-full max-w-5xl rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto text-charcoal">
        {/* Modal Header */}
        <div className="bg-charcoal text-cream-100 px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl font-bold text-cream-100">
              Gretel's Plug Admin Panel
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {/* Tabs Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-md transition ${activeTab === 'products' ? 'bg-gold text-charcoal' : 'text-cream-100 hover:text-gold'}`}
              >
                Outfit Catalog
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-md transition ${activeTab === 'settings' ? 'bg-gold text-charcoal' : 'text-cream-100 hover:text-gold'}`}
              >
                Settings & Phone
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-cream-100/70 hover:text-gold p-1 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Hidden File Picker Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageFileUpload}
          className="hidden"
        />

        {/* Modal Content Body */}
        {activeTab === 'settings' ? (
          <form onSubmit={handleSettingsSubmit} className="p-8 space-y-6 overflow-y-auto flex-1 max-w-xl mx-auto w-full">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto text-gold">
                <Settings className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl font-bold">WhatsApp & Passcode Settings</h4>
              <p className="text-xs text-charcoal/70">
                Update your official WhatsApp contact number and admin passcode.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-gold" />
                  WhatsApp Order Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 09161273360"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-cream-200 border border-silk-taupe px-4 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-gold"
                />
                <p className="text-[11px] text-charcoal/60">
                  Default: <code>09161273360</code>. Works with both local numbers and international codes.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold" />
                  Admin Passcode / PIN
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2020"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-cream-200 border border-silk-taupe px-4 py-3 rounded-xl text-sm font-bold tracking-widest focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-md transition"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </form>
        ) : (
          /* Products Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-silk-taupe/60">
            {/* Left List */}
            <div className="lg:col-span-5 p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold">Active Outfits ({designs.length})</h4>
                <button
                  type="button"
                  onClick={handleStartNew}
                  className="flex items-center gap-1.5 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              </div>

              <div className="space-y-3">
                {designs.map((d) => (
                  <div
                    key={d.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition cursor-pointer ${
                      editingDesign?.id === d.id ? 'border-gold bg-cream-200 shadow-sm' : 'border-silk-taupe bg-cream-100 hover:bg-cream-200/50'
                    }`}
                    onClick={() => handleStartEdit(d)}
                  >
                    <img src={d.mainImage} alt={d.title} className="w-12 h-14 object-cover rounded-lg border border-gold/30 shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-sm font-bold truncate">{d.title}</h5>
                      <span className="text-[10px] text-gold-dark font-semibold uppercase block truncate">{d.category}</span>
                      <span className="text-[10px] text-charcoal/60 font-mono">{d.priceRange}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleStartEdit(d); }}
                        className="p-1.5 text-charcoal/60 hover:text-gold transition"
                        title="Edit Outfit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(d.id); }}
                        className="p-1.5 text-charcoal/60 hover:text-red-600 transition"
                        title="Delete Outfit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleFormSubmit} className="lg:col-span-7 p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              <div className="flex items-center justify-between pb-2 border-b border-silk-taupe/60">
                <h4 className="font-serif text-xl font-bold">
                  {editingDesign ? `Edit: ${editingDesign.title}` : 'Add New Outfit'}
                </h4>
                {editingDesign && (
                  <button
                    type="button"
                    onClick={handleStartNew}
                    className="text-xs font-bold text-gold-dark hover:underline"
                  >
                    + Add New Outfit
                  </button>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Outfit Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Silk Gown"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Category</label>
                  <select
                    value={formData.category || 'Dresses & Gowns'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tagline & Price Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Short Description / Motto</label>
                  <input
                    type="text"
                    placeholder="e.g. Soft silk dress tailored to your fit"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Price Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₦60,000 - ₦90,000"
                    value={formData.priceRange || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-2 p-4 bg-cream-200/60 rounded-2xl border border-gold/30">
                <label className="text-xs font-extrabold uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-gold" />
                    Outfit Photo (Gallery Upload or Link)
                  </span>
                  {formData.mainImage && (
                    <span className="text-[10px] text-green-700 font-bold">Photo Ready</span>
                  )}
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Compressing...' : 'Upload Photo from Gallery'}</span>
                  </button>

                  <span className="text-xs font-bold text-charcoal/40">OR</span>

                  <input
                    type="text"
                    placeholder="Paste image web URL..."
                    value={formData.mainImage || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainImage: e.target.value }))}
                    className="flex-1 w-full bg-cream-100 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                {formData.mainImage && (
                  <div className="pt-2 flex items-center gap-3">
                    <img
                      src={formData.mainImage}
                      alt="Preview"
                      className="w-16 h-20 object-cover rounded-xl border-2 border-gold shadow-md"
                    />
                    <div className="text-xs text-charcoal/70 space-y-0.5">
                      <p className="font-bold text-charcoal">Photo Preview Ready</p>
                      <p className="text-[10px] text-gold-dark">Will display across Gretel's Plug website</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Ready In & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Ready in (Days)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 - 7 Days"
                    value={formData.craftingTime || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, craftingTime: e.target.value }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase block mb-1">Full Outfit Details</label>
                  <textarea
                    rows={2}
                    placeholder="Describe fit, fabric quality, and occasion..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-cream-200 border border-silk-taupe px-3 py-2 rounded-xl text-xs font-semibold focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="accent-gold w-4 h-4 rounded"
                  />
                  <span>Feature in Lookbook Section</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isNewArrival: e.target.checked }))}
                    className="accent-gold w-4 h-4 rounded"
                  />
                  <span>Show "NEW" Badge</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-silk-taupe flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  {editingDesign ? 'Save Outfit Changes' : 'Add Outfit to Website'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
