import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { SocialLink, SocialPlatform } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  link?: SocialLink;
}

const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose, link }) => {
  const { t } = useLanguage();
  const { addSocialLink, updateSocialLink, deleteSocialLink } = useContent();

  const [formData, setFormData] = useState<Partial<SocialLink>>({
    platform: 'youtube',
    handle: '',
    url: '',
    followers: ''
  });

  useEffect(() => {
    if (link) {
      setFormData(link);
    } else {
      setFormData({ platform: 'youtube', handle: '', url: '', followers: '' });
    }
  }, [link, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link && link.id) {
        updateSocialLink({ ...formData, id: link.id } as SocialLink);
    } else {
        const newLink: SocialLink = {
            ...formData as SocialLink,
            id: Date.now().toString()
        };
        addSocialLink(newLink);
    }
    onClose();
  };

  const handleDelete = () => {
    if (link && link.id) {
        deleteSocialLink(link.id);
        onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-6 max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">
            {link ? t.social.edit : t.social.add}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.social.form.platform}</label>
                <select 
                    value={formData.platform}
                    onChange={e => setFormData({...formData, platform: e.target.value as SocialPlatform})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="bilibili">Bilibili</option>
                    <option value="xiaohongshu">Xiaohongshu (Little Red Book)</option>
                    <option value="douyin">Douyin</option>
                    <option value="tiktok">TikTok</option>
                    <option value="weibo">Weibo</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Website / Blog / Other</option>
                </select>
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.social.form.handle}</label>
                <input 
                    type="text" 
                    required
                    value={formData.handle}
                    onChange={e => setFormData({...formData, handle: e.target.value})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="@username"
                />
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.social.form.url}</label>
                <input 
                    type="text" 
                    required
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.social.form.followers}</label>
                <input 
                    type="text" 
                    value={formData.followers}
                    onChange={e => setFormData({...formData, followers: e.target.value})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="e.g. 50K"
                />
            </div>

            <div className="flex gap-3 pt-2">
                {link && (
                    <button 
                        type="button" 
                        onClick={handleDelete}
                        className="flex-1 bg-red-500/10 text-red-500 border border-red-500/50 py-2 rounded font-bold uppercase text-xs hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-3 h-3" /> {t.schedule.delete}
                    </button>
                )}
                <button 
                    type="submit"
                    className="flex-[2] bg-tennis-green text-black py-2 rounded font-bold uppercase text-xs hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                    <Save className="w-3 h-3" /> {t.schedule.save}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SocialModal;