import React, { useState } from 'react';
import { Youtube, Instagram, Twitter, Tv, Video, ExternalLink, Plus, Edit2, Globe, Linkedin, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { SocialLink, SocialPlatform } from '../types';
import SocialModal from './SocialModal';

const SocialMatrix: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { socialLinks } = useContent();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | undefined>(undefined);

  const handleEditClick = (link: SocialLink, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedLink(undefined);
    setIsModalOpen(true);
  };

  const getPlatformInfo = (platform: SocialPlatform) => {
    switch (platform) {
      case 'youtube': 
        return { 
            icon: <Youtube className="w-6 h-6" />, 
            label: 'YouTube',
            color: 'group-hover:text-red-600',
            border: 'hover:border-red-600/50 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.3)]'
        };
      case 'instagram': 
        return { 
            icon: <Instagram className="w-6 h-6" />, 
            label: 'Instagram',
            color: 'group-hover:text-pink-500',
            border: 'hover:border-pink-500/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]'
        };
      case 'twitter': 
        return { 
            icon: <Twitter className="w-6 h-6" />, 
            label: 'Twitter / X',
            color: 'group-hover:text-blue-400',
            border: 'hover:border-blue-400/50 hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]'
        };
      case 'bilibili': 
        return { 
            icon: <Tv className="w-6 h-6" />, 
            label: 'Bilibili',
            color: 'group-hover:text-blue-400',
            border: 'hover:border-blue-400/50 hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]'
        };
      case 'tiktok': 
      case 'douyin':
        return { 
            icon: <Video className="w-6 h-6" />, 
            label: platform === 'douyin' ? 'Douyin' : 'TikTok',
            color: 'group-hover:text-cyan-400',
            border: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]'
        };
      case 'xiaohongshu':
        return {
            icon: <BookOpen className="w-6 h-6" />,
            label: 'Little Red Book',
            color: 'group-hover:text-red-500',
            border: 'hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]'
        };
      case 'weibo':
         return {
            icon: <Globe className="w-6 h-6" />, // Using generic for Weibo if no specific svg
            label: 'Weibo',
            color: 'group-hover:text-yellow-500',
            border: 'hover:border-yellow-500/50 hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]'
         };
      case 'linkedin':
         return {
            icon: <Linkedin className="w-6 h-6" />,
            label: 'LinkedIn',
            color: 'group-hover:text-blue-600',
            border: 'hover:border-blue-600/50 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)]'
         };
      default: 
        return { 
            icon: <Globe className="w-6 h-6" />, 
            label: 'Website',
            color: 'group-hover:text-tennis-green',
            border: 'hover:border-tennis-green/50 hover:shadow-[0_0_30px_-5px_rgba(220,241,14,0.3)]'
        };
    }
  };

  return (
    <section id="social" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[800px] h-[300px] bg-tennis-green/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{t.social.title}</h2>
            <p className="text-gray-400 font-light">{t.social.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((link) => {
                const info = getPlatformInfo(link.platform);
                return (
                    <div 
                        key={link.id} 
                        className={`group relative bg-[#1a1a1a] border border-white/5 p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 ${info.border}`}
                    >
                        {/* Admin Edit Trigger */}
                        {isAuthenticated && (
                            <button 
                                onClick={(e) => handleEditClick(link, e)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        )}

                        <div className="flex flex-col h-full justify-between items-center text-center">
                            <div className="mb-6 relative">
                                <div className={`w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-transparent ${info.color}`}>
                                    {info.icon}
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block group-hover:text-white transition-colors">
                                    {info.label}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{link.handle}</h3>
                                <p className="text-sm text-gray-400 font-serif italic">
                                    {link.followers} {t.social.followers}
                                </p>
                            </div>
                            
                            <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full max-w-[140px] py-2.5 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest border border-white/10 group-hover:border-white"
                            >
                                <span>{t.social.visit}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                );
            })}

            {/* Admin Add Button */}
            {isAuthenticated && (
                <button 
                    onClick={handleAddClick}
                    className="group flex flex-col items-center justify-center gap-4 bg-[#1a1a1a] border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-tennis-green hover:bg-white/5 transition-all min-h-[280px]"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 group-hover:bg-tennis-green group-hover:text-black flex items-center justify-center transition-colors">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-sm group-hover:text-white">
                        {t.social.add}
                    </span>
                </button>
            )}
        </div>
      </div>

      <SocialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        link={selectedLink} 
      />
    </section>
  );
};

export default SocialMatrix;