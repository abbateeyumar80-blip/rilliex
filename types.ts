

export type Language = 'en' | 'zh';

export interface ScheduleEvent {
  id: string;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string;
  title: string;
  location: string;
  type: 'match' | 'training' | 'tournament';
  details?: string;
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
  category: 'action' | 'lifestyle' | 'gear' | 'training';
  type: 'image' | 'video';
  position?: 'object-center' | 'object-top' | 'object-bottom'; // Deprecated but kept for fallback
  transform?: {
    x: number;
    y: number;
    scale: number;
  };
  caption_en?: string;
  caption_zh?: string;
  width?: number; 
  height?: number;
}

export interface Achievement {
  id: string;
  year: string;
  title_en: string;
  title_zh: string;
  icon?: 'trophy' | 'medal' | 'star';
}

export type SocialPlatform = 'youtube' | 'instagram' | 'bilibili' | 'tiktok' | 'twitter' | 'xiaohongshu' | 'weibo' | 'linkedin' | 'douyin' | 'other';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  handle: string;
  url: string;
  followers: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}