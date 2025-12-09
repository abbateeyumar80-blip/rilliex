import React, { useState, useRef } from 'react';
import { Maximize2, X, Play, Plus, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import { Photo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { compressImage, fileToBase64 } from '../utils/imageUtils';

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { gallery, addToGallery, removeFromGallery } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const type = file.type.startsWith('video') ? 'video' : 'image';
        
        try {
            let processedUrl = '';
            if (type === 'image') {
                processedUrl = await compressImage(file);
            } else {
                processedUrl = await fileToBase64(file);
            }

            const newPhoto: Photo = {
                id: Date.now().toString(),
                url: processedUrl,
                alt: '', // Empty default
                category: 'lifestyle',
                type: type,
                transform: { x: 0, y: 0, scale: 1 }
            };
            addToGallery(newPhoto);
            // No editor opening, just done.

        } catch (e) {
            console.error(e);
            alert("File too large to save in browser storage.");
        }
    }
  };

  const getCaption = (photo: Photo) => {
      let text = '';
      if (language === 'zh' && photo.caption_zh) text = photo.caption_zh;
      else if (language === 'en' && photo.caption_en) text = photo.caption_en;
      else text = photo.alt;
      
      if (text === 'New Upload') return '';
      return text;
  };

  return (
    <section id="gallery" className="py-24 bg-[#0f0f0f] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-l-2 border-tennis-green pl-6 flex justify-between items-end">
            <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{t.gallery.title}</h2>
                <p className="text-gray-400 font-light">{t.gallery.subtitle}</p>
            </div>
            {isAuthenticated && (
                <div className="hidden md:block">
                     <span className="text-tennis-green text-xs font-bold uppercase tracking-widest border border-tennis-green/30 px-3 py-1 rounded-full animate-pulse">
                        {t.gallery.adminMode}
                     </span>
                </div>
            )}
        </div>

        {/* Square Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Admin Upload Tile */}
          {isAuthenticated && (
            <div 
                className="relative group border-2 border-dashed border-gray-700 rounded-sm hover:border-tennis-green transition-colors cursor-pointer flex flex-col items-center justify-center gap-4 bg-[#1a1a1a] aspect-square"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="w-16 h-16 rounded-full bg-gray-800 group-hover:bg-tennis-green group-hover:text-black flex items-center justify-center transition-colors">
                    <Plus className="w-8 h-8" />
                </div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm group-hover:text-white">
                    {t.gallery.add}
                </span>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
            </div>
          )}

          {gallery.map((photo) => {
            const transformStyle = photo.transform 
                ? { transform: `translate(${photo.transform.x}px, ${photo.transform.y}px) scale(${photo.transform.scale})` }
                : undefined;
            
            const caption = getCaption(photo);
            const hasCaption = caption && caption.trim().length > 0;

            return (
              <div 
                key={photo.id}
                className="relative group overflow-hidden rounded-sm aspect-square bg-[#1a1a1a]"
              >
                {/* Click area for opening lightbox */}
                <div 
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                ></div>

                {photo.type === 'video' ? (
                     <div className="w-full h-full relative overflow-hidden pointer-events-none">
                        <video 
                            src={photo.url} 
                            className={`w-full h-full object-cover transition-all duration-700 origin-center`}
                            style={transformStyle}
                            muted
                            loop
                            playsInline
                            // Removing mouse events here as they are blocked by the overlay div
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur rounded-full flex items-center justify-center border border-white/20 pointer-events-none group-hover:scale-110 transition-transform z-10">
                            <Play className="w-5 h-5 text-white fill-white ml-1" />
                        </div>
                     </div>
                ) : (
                    <div className="w-full h-full overflow-hidden pointer-events-none">
                        <img
                        src={photo.url}
                        alt={caption}
                        className={`w-full h-full object-cover transition-all duration-700 origin-center`}
                        style={transformStyle}
                        />
                    </div>
                )}
                
                {/* Overlay - Only show if has caption */}
                {hasCaption && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20 pointer-events-none">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-tennis-green text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                {photo.type === 'video' ? <Video className="w-3 h-3"/> : <ImageIcon className="w-3 h-3"/>}
                                {photo.category}
                            </span>
                            <p className="text-white font-serif italic text-lg truncate w-40">{caption}</p>
                        </div>
                        <Maximize2 className="text-white w-5 h-5 mb-1" />
                    </div>
                    </div>
                )}

                {/* Admin Controls - Delete Only */}
                {isAuthenticated && (
                     <button 
                         type="button"
                         className="absolute top-2 right-2 z-50 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:scale-110 transition-all cursor-pointer"
                         onClick={(e) => {
                             // CRITICAL: Stop propagation to prevent opening lightbox
                             e.stopPropagation();
                             e.preventDefault();
                             // Instant delete as requested
                             removeFromGallery(photo.id);
                         }}
                         title={t.gallery.delete}
                     >
                         <Trash2 className="w-5 h-5" />
                     </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <button 
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-50 p-2"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
             {selectedPhoto.type === 'video' ? (
                 <video 
                    src={selectedPhoto.url} 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-[80vh] shadow-2xl shadow-black outline-none"
                 />
             ) : (
                <img 
                src={selectedPhoto.url} 
                alt={getCaption(selectedPhoto)}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl shadow-black"
                />
             )}
            
            {getCaption(selectedPhoto) && (
                <div className="mt-6 text-center">
                <h3 className="text-xl font-serif text-white">{getCaption(selectedPhoto)}</h3>
                <p className="text-tennis-green text-sm uppercase tracking-widest mt-2">{selectedPhoto.category}</p>
                </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;