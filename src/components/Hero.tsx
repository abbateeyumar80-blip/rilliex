import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Camera } from 'lucide-react';
import { USER_NAME, DEFAULT_HERO_IMAGE } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { compressImage } from '../utils/imageUtils';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { heroImage, updateHeroImage } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State to manage the active image source
  const [currentImgSrc, setCurrentImgSrc] = useState(heroImage);

  // Sync state with context
  useEffect(() => {
    setCurrentImgSrc(heroImage);
  }, [heroImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        try {
            // Compress and convert to Base64 to save in localStorage via context
            const base64 = await compressImage(file);
            updateHeroImage(base64);
        } catch (error) {
            console.error("Failed to process image", error);
            alert("Failed to process image. Try a smaller file.");
        }
    }
  };

  const handleError = () => {
      // No fallback as requested by user.
      console.error("Hero image failed to load: ", currentImgSrc);
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center group/hero bg-[#0f0f0f]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <img
            src={currentImgSrc}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] scale-100"
            onError={handleError}
         />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0f0f0f]"></div>
      </div>

      {/* Admin Controls */}
      {isAuthenticated && (
        <div className="absolute top-24 right-6 z-30">
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-black/50 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-tennis-green hover:text-black hover:border-tennis-green transition-all"
            >
                <Camera className="w-4 h-4" />
                {t.hero.changeBg}
            </button>
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <h2 className="text-tennis-green text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 animate-[fadeIn_1s_ease-out]">
          {t.hero.subtitle}
        </h2>
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight animate-[slideUp_1s_ease-out_0.2s_both]">
          {USER_NAME}
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed animate-[slideUp_1s_ease-out_0.4s_both]">
          {t.hero.desc}
        </p>
        
        <div className="animate-[fadeIn_1s_ease-out_0.8s_both]">
          <button
            onClick={() => scrollToSection('gallery')}
            className="group relative px-8 py-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-tennis-green transition-colors duration-300"
          >
            <span className="relative z-10 text-white text-xs font-bold tracking-widest uppercase group-hover:text-tennis-green transition-colors">
              {t.hero.cta}
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button onClick={() => scrollToSection('schedule')} className="text-gray-500 hover:text-white transition-colors">
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;