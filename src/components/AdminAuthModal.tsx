import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  correctPin: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  correctPin,
  onSuccess,
  onClose
}) => {
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-cream-100 w-full max-w-md rounded-3xl border border-gold/40 shadow-2xl overflow-hidden relative p-6 sm:p-8 text-charcoal">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-charcoal/60 hover:text-gold p-1 rounded-full hover:bg-cream-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon & Title */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto text-gold-dark shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold">Gretel's Plug Admin Lock</h3>
            <p className="text-xs text-charcoal/70 font-medium">
              Enter your passcode to access the Admin Panel.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter Passcode (Default: 2020)"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setError(false); }}
                className={`w-full bg-cream-200 border pl-11 pr-4 py-3 rounded-xl text-sm font-extrabold tracking-widest text-center focus:outline-none transition ${
                  error ? 'border-red-500 ring-2 ring-red-200' : 'border-silk-taupe focus:border-gold'
                }`}
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 font-bold flex items-center justify-center gap-1.5 animate-bounce pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Please try again.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-cream-100 hover:text-charcoal py-3.5 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-md transition duration-300"
          >
            <span>Unlock Admin Access</span>
          </button>
        </form>

        <p className="text-[10px] text-center text-charcoal/40 uppercase tracking-widest mt-6">
          Gretel's Plug Security
        </p>
      </div>
    </div>
  );
};
