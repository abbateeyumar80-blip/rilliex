import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-8 max-w-sm w-full relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-tennis-green/10 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-tennis-green" />
          </div>
          <h3 className="text-xl font-bold text-white">{t.admin.loginTitle}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder={t.admin.passwordPlaceholder}
              className={`w-full bg-black/30 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-tennis-green transition-colors`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-1">Incorrect passcode</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-tennis-green text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            {t.admin.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;