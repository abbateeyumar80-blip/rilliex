import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.gallery, id: 'gallery' },
    { label: t.nav.achievements, id: 'achievements' },
    { label: t.nav.schedule, id: 'schedule' },
    { label: t.nav.social, id: 'social' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection('hero')}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-tennis-green rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-md"></div>
             {/* Tennis ball stylized icon */}
             <div className="w-8 h-8 rounded-full border-2 border-tennis-green flex items-center justify-center overflow-hidden relative bg-black/50">
                <div className="absolute w-[140%] h-[140%] border border-tennis-green rounded-full left-[-70%] top-[20%]"></div>
                <div className="absolute w-[140%] h-[140%] border border-tennis-green rounded-full right-[-70%] bottom-[20%]"></div>
             </div>
          </div>
          <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.2em] text-white font-sans uppercase leading-none">
                ACE
              </span>
              <span className="text-[9px] text-tennis-green tracking-[0.3em] uppercase leading-none mt-1 group-hover:tracking-[0.4em] transition-all">
                {t.nav.portfolio}
              </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xs uppercase tracking-widest text-gray-300 hover:text-tennis-green transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-4 w-px bg-white/10 mx-2"></div>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xs font-bold uppercase">{language === 'en' ? 'EN' : '中'}</span>
          </button>

          <button 
            onClick={() => scrollToSection('schedule')}
            className="ml-4 px-5 py-2 border border-tennis-green/50 text-tennis-green text-xs font-bold uppercase tracking-widest hover:bg-tennis-green hover:text-black transition-all rounded-sm"
          >
            {t.nav.nextMatch}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="text-gray-300 hover:text-white transition-colors"
            >
                <span className="text-xs font-bold uppercase border border-gray-600 px-2 py-1 rounded">{language === 'en' ? 'EN' : '中'}</span>
            </button>
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel border-t border-gray-800 lg:hidden flex flex-col p-6 gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left text-lg font-serif italic text-gray-200 hover:text-tennis-green"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;