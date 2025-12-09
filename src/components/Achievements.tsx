import React, { useRef } from 'react';
import { Trophy, Medal, MapPin, Users, Award, Crown, Globe, Camera } from 'lucide-react';
import { ACHIEVEMENTS_DATA, COACHING_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { compressImage } from '../utils/imageUtils';

const Achievements: React.FC = () => {
  const { t, language } = useLanguage();
  const { profileImage, updateProfileImage } = useContent();
  const { isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRankStyle = () => {
    // Unified Gold "Premium" style for ALL awards
    return { 
        text: 'text-yellow-400', 
        border: 'border-yellow-500/30', 
        bg: 'bg-gradient-to-br from-yellow-500/10 to-transparent',
        iconColor: 'text-yellow-400',
        glow: 'shadow-[0_0_15px_-5px_rgba(234,179,8,0.2)]'
    };
  };

  const getIcon = (type?: string, colorClass: string = 'text-yellow-400') => {
    switch (type) {
      case 'star': return <Crown className={`w-6 h-6 ${colorClass}`} />;
      case 'medal': return <Medal className={`w-6 h-6 ${colorClass}`} />;
      case 'trophy': return <Trophy className={`w-6 h-6 ${colorClass}`} />;
      default: return <Award className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        try {
            const base64 = await compressImage(e.target.files[0]);
            updateProfileImage(base64);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Image too large to save.");
        }
    }
  };

  const itemStyle = getRankStyle();
  const locations = COACHING_INFO.locations[language].split(' / ');

  return (
    <section id="achievements" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Lux Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tennis-green/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">{t.achievements.title}</h2>
            <div className="w-24 h-1 bg-tennis-green mx-auto mb-6"></div>
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">{t.achievements.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Coaching Profile (Passport Style) with HERO TITLE */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <div className="bg-[#121212] border border-white/10 rounded-2xl p-0 overflow-hidden group hover:border-tennis-green/30 transition-colors shadow-2xl flex-1 flex flex-col sticky top-24">
                    <div className="bg-tennis-green/10 p-6 border-b border-white/5 flex items-center justify-between">
                         <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-4 h-4 text-tennis-green" />
                            {t.achievements.coachingTitle}
                         </h3>
                         <div className="w-1.5 h-1.5 rounded-full bg-tennis-green animate-pulse"></div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col gap-6">
                        
                        {/* Profile Image - Centered and editable */}
                        <div className="flex justify-center mb-2 relative group/profile w-fit mx-auto">
                            <div className="w-32 h-32 rounded-full p-1 border border-tennis-green/30 bg-black/50 relative overflow-hidden shadow-[0_0_20px_-5px_rgba(220,241,14,0.3)]">
                                <img 
                                    src={profileImage} 
                                    alt="Coach Profile" 
                                    className="w-full h-full rounded-full object-cover" 
                                />
                            </div>
                            
                            {/* Admin Camera Button Overlay */}
                            {isAuthenticated && (
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 bg-tennis-green text-black p-2 rounded-full hover:scale-110 transition-transform shadow-lg z-20 border border-black"
                                    title="Change Profile Photo"
                                >
                                    <Camera size={16} />
                                </button>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* National Athlete Badge */}
                        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 rounded-xl border border-yellow-500/20 relative overflow-hidden text-center md:text-left">
                            <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                                <Crown className="w-24 h-24 text-yellow-500" />
                            </div>
                            <div className="flex items-center gap-3 mb-3 relative z-10 justify-center md:justify-start">
                                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
                                <span className="text-yellow-500/80 font-bold tracking-[0.2em] uppercase text-[10px]">
                                    {t.achievements.gradeLabel}
                                </span>
                            </div>
                            <h3 className="text-2xl font-serif text-white font-medium leading-tight relative z-10">
                                {language === 'en' ? COACHING_INFO.title.en : COACHING_INFO.title.zh}
                            </h3>
                        </div>

                        <div className="w-full h-px bg-white/5"></div>

                        {/* Visual Locations */}
                        <div className="space-y-4">
                             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                {t.achievements.baseLabel}
                             </p>
                             <div className="flex flex-col gap-3">
                                {locations.map((loc, idx) => {
                                    const isIntl = loc.toLowerCase().includes('perth') || loc.includes('珀斯');
                                    return (
                                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${isIntl ? 'bg-tennis-green/5 border-tennis-green/20' : 'bg-black/20 border-white/5'}`}>
                                            {isIntl ? <Globe className="w-5 h-5 text-tennis-green" /> : <MapPin className="w-5 h-5 text-gray-400" />}
                                            <span className={`font-serif ${isIntl ? 'text-white' : 'text-gray-300'}`}>{loc}</span>
                                            {isIntl && <span className="ml-auto text-[9px] uppercase font-bold text-tennis-green tracking-widest border border-tennis-green/20 px-2 py-0.5 rounded">
                                                {t.achievements.primaryBadge}
                                            </span>}
                                        </div>
                                    )
                                })}
                             </div>
                        </div>

                        <div className="space-y-4 mt-auto">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                {t.achievements.focusLabel}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {COACHING_INFO.targets[language].map((item, idx) => (
                                    <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Achievements Grid (Unified Gold Style) */}
            <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-4">
                    {ACHIEVEMENTS_DATA.map((item) => {
                        return (
                            <div 
                                key={item.id} 
                                className={`group relative bg-[#121212] border ${itemStyle.border} rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a1a1a] flex flex-col md:flex-row gap-4 items-start md:items-center`}
                            >
                                <div className="flex items-center gap-4 min-w-[120px]">
                                    <div className={`${itemStyle.iconColor} opacity-70 group-hover:opacity-100 transition-opacity bg-yellow-500/10 p-3 rounded-full`}>
                                        {getIcon(item.icon, itemStyle.iconColor)}
                                    </div>
                                    <span className="font-mono text-xs text-yellow-500/70">
                                        {item.year}
                                    </span>
                                </div>
                                
                                <h4 className={`text-base font-serif leading-snug ${itemStyle.text} flex-1`}>
                                    {language === 'en' ? item.title_en : item.title_zh}
                                </h4>

                                {/* Hover Glow Effect */}
                                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${itemStyle.bg}`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;