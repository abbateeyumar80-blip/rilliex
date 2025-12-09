import React, { useState, useRef, useEffect } from 'react';
import { X, Save, ZoomIn, RotateCcw, Maximize, LayoutTemplate } from 'lucide-react';
import { Photo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PhotoEditorProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (photo: Photo) => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ photo, isOpen, onClose, onSave }) => {
  const { t } = useLanguage();
  
  // Transform State (Only Scale, Position is locked to Center)
  const [scale, setScale] = useState(1);
  
  // Image & Container State
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  
  // Caption State
  const [captionEn, setCaptionEn] = useState('');
  const [captionZh, setCaptionZh] = useState('');

  // Initialize
  useEffect(() => {
    if (isOpen) {
        // Initialize state from photo prop
        const savedTransform = photo.transform;
        
        if (savedTransform && savedTransform.scale !== 1) {
            setScale(savedTransform.scale);
        } else {
            setScale(1);
        }

        setCaptionEn(photo.caption_en || photo.alt || '');
        setCaptionZh(photo.caption_zh || '');
        setImgSize({ w: 0, h: 0 }); 
    }
  }, [isOpen, photo]);

  // Measure Container
  useEffect(() => {
      if (isOpen && containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          setContainerSize({ w: width, h: height });
      }
  }, [isOpen]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
      const target = e.currentTarget;
      const w = (target as HTMLVideoElement).videoWidth || (target as HTMLImageElement).naturalWidth;
      const h = (target as HTMLVideoElement).videoHeight || (target as HTMLImageElement).naturalHeight;
      setImgSize({ w, h });
  };

  // --- Actions ---

  const handleSave = () => {
    onSave({
        ...photo,
        transform: { x: 0, y: 0, scale }, // Always center
        caption_en: captionEn,
        caption_zh: captionZh,
        alt: captionEn || photo.alt 
    });
    onClose();
  };

  const handleReset = () => {
      setScale(1);
  };

  const handleFit = () => {
      if (containerSize.w === 0 || imgSize.w === 0) return;
      const scaleW = containerSize.w / imgSize.w;
      const scaleH = containerSize.h / imgSize.h;
      const newScale = Math.min(scaleW, scaleH) * 0.9;
      setScale(newScale);
  };

  const handleCover = () => {
      if (containerSize.w === 0 || imgSize.w === 0) return;
      const scaleW = containerSize.w / imgSize.w;
      const scaleH = containerSize.h / imgSize.h;
      const newScale = Math.max(scaleW, scaleH);
      setScale(newScale);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]">
        <div className="bg-[#1e1e1e] border border-white/10 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
            
            {/* Preview Area (Square) */}
            <div className="flex-1 bg-[#121212] relative min-h-0 overflow-hidden flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] select-none">
                 
                 <div 
                     className="w-full max-w-[80%] aspect-square relative overflow-hidden bg-black border-2 border-tennis-green shadow-2xl"
                     ref={containerRef}
                 >
                     {/* Checkerboard */}
                     <div className="absolute inset-0 opacity-20 pointer-events-none" 
                          style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
                     </div>

                     {photo.type === 'video' ? (
                        <video 
                            src={photo.url}
                            onLoadedMetadata={handleImageLoad}
                            className="max-w-none origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                transform: `translate(-50%, -50%) scale(${scale})`, // Centered logic
                                transition: 'transform 0.1s ease-out'
                            }}
                            muted
                            loop
                        />
                     ) : (
                        <img 
                            src={photo.url}
                            onLoad={handleImageLoad}
                            alt="Preview"
                            className="max-w-none origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                transform: `translate(-50%, -50%) scale(${scale})`, // Centered logic
                                transition: 'transform 0.1s ease-out'
                            }}
                            draggable={false}
                        />
                     )}

                    {/* Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 border border-white/20">
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                            {[...Array(9)].map((_, i) => <div key={i} className="border border-white/10"></div>)}
                        </div>
                    </div>
                 </div>
            </div>

            {/* Controls */}
            <div className="w-full md:w-80 bg-[#1a1a1a] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-1/2 md:h-full shrink-0">
                <div className="flex justify-between items-center p-4 border-b border-white/5 shrink-0">
                    <h3 className="text-white font-bold text-lg">{t.editor.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs text-gray-400 uppercase font-bold flex items-center gap-2">
                                <ZoomIn className="w-3 h-3" />
                                {t.editor.zoom}
                            </label>
                            <span className="text-tennis-green text-xs font-mono">{Math.round(scale * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.1" 
                            max="3" 
                            step="0.05" 
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="w-full accent-tennis-green h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex gap-2 mt-4">
                            <button onClick={handleReset} className="flex-1 bg-black/30 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold uppercase py-2 rounded border border-white/5 transition-colors flex flex-col items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                            <button onClick={handleFit} className="flex-1 bg-black/30 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold uppercase py-2 rounded border border-white/5 transition-colors flex flex-col items-center gap-1">
                                <Maximize className="w-3 h-3" /> Fit
                            </button>
                             <button onClick={handleCover} className="flex-1 bg-black/30 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold uppercase py-2 rounded border border-white/5 transition-colors flex flex-col items-center gap-1">
                                <LayoutTemplate className="w-3 h-3" /> Cover
                            </button>
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.editor.captionEn}</label>
                            <input 
                                type="text" 
                                value={captionEn}
                                onChange={(e) => setCaptionEn(e.target.value)}
                                className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-tennis-green focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.editor.captionZh}</label>
                            <input 
                                type="text" 
                                value={captionZh}
                                onChange={(e) => setCaptionZh(e.target.value)}
                                className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-tennis-green focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-[#161616] shrink-0 flex flex-col gap-3">
                    <button 
                        onClick={handleSave}
                        className="w-full bg-tennis-green text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {t.editor.save}
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full bg-transparent text-gray-500 font-bold py-2 hover:text-white transition-colors uppercase tracking-wider text-xs"
                    >
                        {t.editor.cancel}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PhotoEditor;