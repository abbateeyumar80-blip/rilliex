import { ScheduleEvent, Photo, Achievement, SocialLink } from './types';

export const USER_NAME = "Rilliex";
export const USER_BIO_EN = `Tennis Content Creator & Trick Shot Artist. Bringing entertainment to the court with high-energy challenges and tutorials.`;
export const USER_BIO_ZH = `网球内容创作者 & 花式击球艺术家。通过高能挑战和教学视频，为球场带来无限乐趣。`;

// Using absolute path for public folder asset. 
// Ensure image/cover.jpg exists in the 'public' directory of your project root.
export const DEFAULT_HERO_IMAGE = '/image/cover.jpg';
export const DEFAULT_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop';

// Coaching Profile Data
export const COACHING_INFO = {
  title: {
    en: "National First-Class Tennis Athlete",
    zh: "国家一级网球运动员"
  },
  locations: {
    en: "Perth (Aus) / Chengdu / Wanning",
    zh: "澳大利亚珀斯 / 成都 / 万宁"
  },
  targets: {
    en: ["Zero Foundation", "Advanced", "Sparring", "Kids", "Adults"],
    zh: ["零基础", "进阶", "陪练", "少儿", "成人"]
  },
  formats: {
    en: ["One-on-One", "Group Sessions"],
    zh: ["一对一", "一对多"]
  }
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'a1',
    year: '2022',
    title_en: '25th Shandong Games: Women\'s Group A Team 2nd, Doubles 3rd',
    title_zh: '山东省第二十五届运动会女子甲组团体第二名、双打第三名',
    icon: 'medal'
  },
  {
    id: 'a2',
    year: '2021',
    title_en: 'Shandong Tennis Championship: Singles 3rd, Doubles 1st',
    title_zh: '2021年山东省网球冠军赛单打第三名 双打第一名',
    icon: 'trophy'
  },
  {
    id: 'a3',
    year: '2021',
    title_en: 'Shandong Tennis Tournament: Singles 2nd, Doubles 1st',
    title_zh: '2021年山东省网球锦标赛单打第二名、双打第一名',
    icon: 'trophy'
  },
  {
    id: 'a4',
    year: '2020',
    title_en: 'Shandong Tennis Championship: Singles 3rd',
    title_zh: '2020年山东省网球冠军赛单打第三名',
    icon: 'medal'
  },
  {
    id: 'a5',
    year: '2020',
    title_en: 'Shandong Tennis Tournament: Team 1st, Doubles 1st, Singles 3rd',
    title_zh: '2020年山东省网球锦标赛团体第一名、双打第一名、单打第三名',
    icon: 'trophy'
  },
  {
    id: 'a6',
    year: '2019',
    title_en: 'Shandong Youth Ranking Finals: Doubles 1st, Singles 2nd',
    title_zh: '2019年山东省青少年网球排名赛总决赛双打第一名、单打第二名',
    icon: 'trophy'
  },
  {
    id: 'a7',
    year: '2019',
    title_en: 'Shandong Tennis Championship: Singles 3rd',
    title_zh: '2019年山东省网球冠军赛单打第三名',
    icon: 'medal'
  },
  {
    id: 'a8',
    year: '2019',
    title_en: 'Shandong Tennis Tournament: Singles 3rd, Team 1st',
    title_zh: '2019年山东省网球锦标赛单打第三名、团体第一名',
    icon: 'trophy'
  },
  {
    id: 'a9',
    year: '2018',
    title_en: '24th Shandong Games: Team 1st',
    title_zh: '2018年山东省第二十四届运动会团体第一名',
    icon: 'trophy'
  }
];

export const SOCIAL_DATA: SocialLink[] = [
  {
    id: 's1',
    platform: 'youtube',
    handle: '@RilliexTennis',
    url: 'https://youtube.com',
    followers: '50K'
  },
  {
    id: 's2',
    platform: 'instagram',
    handle: '@rilliex_official',
    url: 'https://instagram.com',
    followers: '120K'
  },
   {
    id: 's3',
    platform: 'bilibili',
    handle: 'Rilliex网球',
    url: 'https://bilibili.com',
    followers: '85K'
  },
  {
    id: 's4',
    platform: 'xiaohongshu',
    handle: 'Rilliex',
    url: 'https://xiaohongshu.com',
    followers: '90K'
  }
];

// Updated to represent a weekly schedule
export const SCHEDULE_DATA: ScheduleEvent[] = [
  {
    id: '1',
    dayOfWeek: 'Mon',
    time: '10:00 AM',
    title: 'Trick Shot Filming',
    location: 'Clay Court 1',
    type: 'training',
    details: 'Filming new impossible angle serves.'
  },
  {
    id: '2',
    dayOfWeek: 'Tue',
    time: '02:00 PM',
    title: 'Editing Session',
    location: 'Studio',
    type: 'training',
    details: 'Post-production for YouTube vlog.'
  },
  {
    id: '3',
    dayOfWeek: 'Thu',
    time: '04:00 PM',
    title: 'Collab Match',
    location: 'City Tennis Center',
    type: 'match',
    details: 'Exhibition set vs local pro.'
  },
  {
    id: '4',
    dayOfWeek: 'Fri',
    time: '11:00 AM',
    title: 'Gear Review',
    location: 'Pro Shop',
    type: 'training',
    details: 'Testing the new Wilson prototype.'
  },
  {
    id: '5',
    dayOfWeek: 'Sat',
    time: '01:00 PM',
    title: 'Fan Meetup',
    location: 'Public Courts',
    type: 'tournament',
    details: 'Open hitting session with subscribers.'
  }
];

export const GALLERY_DATA: Photo[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1626245233075-2ac263574c05?q=80&w=1000&auto=format&fit=crop',
    alt: 'Clay court sliding',
    category: 'action',
    type: 'image',
    caption_en: 'Sliding on the red clay',
    caption_zh: '红土滑步',
    position: 'object-center',
    transform: { x: 0, y: 0, scale: 1 }
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1530915516947-9ce5e5265912?q=80&w=1000&auto=format&fit=crop',
    alt: 'New Racket Unboxing',
    category: 'gear',
    type: 'image',
    caption_en: '',
    caption_zh: '',
    position: 'object-center',
    transform: { x: 0, y: 0, scale: 1 }
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1622163642998-1ea36746b147?q=80&w=1000&auto=format&fit=crop',
    alt: 'Trick shot practice',
    category: 'action',
    type: 'video',
    caption_en: 'Practice makes perfect',
    caption_zh: '熟能生巧',
    position: 'object-top',
    transform: { x: 0, y: 0, scale: 1 }
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1560155016-bd4879ae8f21?q=80&w=1000&auto=format&fit=crop',
    alt: 'Serve technique slow-mo',
    category: 'training',
    type: 'video',
    caption_en: '',
    caption_zh: '',
    position: 'object-center',
    transform: { x: 0, y: 0, scale: 1 }
  },
  {
    id: 'p5',
    url: 'https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=1000&auto=format&fit=crop',
    alt: 'Sunset training',
    category: 'lifestyle',
    type: 'image',
    caption_en: 'Golden hour hits different',
    caption_zh: '黄昏训练时刻',
    position: 'object-top',
    transform: { x: 0, y: 0, scale: 1 }
  }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      portfolio: 'Portfolio',
      gallery: 'Gallery',
      achievements: 'Career',
      schedule: 'Schedule',
      social: 'Social',
      contact: 'Contact',
      nextMatch: 'Next Event'
    },
    hero: {
      subtitle: 'Creator & Athlete',
      desc: 'Redefining tennis entertainment. Trick shots, vlogs, and high-performance tennis on the red clay.',
      cta: 'Watch Highlights',
      changeBg: 'Change Background'
    },
    gallery: {
      title: 'Media Feed',
      subtitle: 'Latest uploads, trick shots, and behind the scenes.',
      add: 'Add Media',
      delete: 'Delete',
      adminMode: 'Admin Mode Active'
    },
    achievements: {
      title: 'Career & Honors',
      subtitle: 'Competitive highlights and coaching profile.',
      coachingTitle: 'Coaching Profile',
      gradeLabel: 'Athlete Grade',
      baseLabel: 'Training Bases',
      focusLabel: 'Teaching Focus',
      primaryBadge: 'Main Base'
    },
    social: {
        title: 'Social Matrix',
        subtitle: 'Follow the journey across all platforms.',
        followers: 'Followers',
        visit: 'Visit',
        add: 'Add Link',
        edit: 'Edit Link',
        form: {
            platform: 'Platform',
            handle: 'Handle / Name',
            url: 'URL',
            followers: 'Followers'
        }
    },
    schedule: {
      title: 'Content Schedule',
      subtitle: 'Filming days, editing blocks, and matches.',
      sync: 'Sync Calendar',
      addEvent: 'Add Event',
      editEvent: 'Edit Event',
      save: 'Save Changes',
      delete: 'Delete',
      days: {
        Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
      },
      types: {
          match: 'Match',
          training: 'Training',
          tournament: 'Tournament'
      },
      form: {
          day: 'Day',
          time: 'Time',
          title: 'Title',
          type: 'Type',
          location: 'Location',
          details: 'Details'
      }
    },
    contact: {
      title: "Let's Collaborate",
      desc: "Brand deals, sponsorships, or exhibition matches? Let's create something viral together.",
      cta: 'Work With Me',
      rights: 'All Rights Reserved.'
    },
    ai: {
      greeting: "What's up! I'm Rilliex's AI bot. Ask me about his racket setup, latest video, or trick shot tips.",
      placeholder: "Ask about the tweener...",
      title: "Rilliex AI"
    },
    admin: {
      loginTitle: 'Creator Access',
      passwordPlaceholder: 'Enter passcode',
      loginBtn: 'Unlock',
      logoutBtn: 'Lock',
      uploadTitle: 'Upload Media',
      captionPlaceholder: 'Enter caption...',
      categoryLabel: 'Category',
      fileLabel: 'Choose File',
      cancel: 'Cancel',
      save: 'Save',
    },
    editor: {
      title: 'Edit Media',
      zoom: 'Zoom',
      drag: 'Drag Image to Adjust',
      captionEn: 'English Caption',
      captionZh: 'Chinese Caption',
      save: 'Save Changes',
      cancel: 'Cancel'
    }
  },
  zh: {
    nav: {
      portfolio: '个人主页',
      gallery: '媒体库',
      achievements: '生涯',
      schedule: '日程',
      social: '矩阵',
      contact: '合作',
      nextMatch: '下个活动'
    },
    hero: {
      subtitle: '创作者 & 运动员',
      desc: '重新定义网球娱乐。花式击球、Vlog以及红土场上的高能时刻。',
      cta: '观看集锦',
      changeBg: '更换背景'
    },
    gallery: {
      title: '媒体动态',
      subtitle: '最新上传、花式技巧和幕后花絮。',
      add: '添加媒体',
      delete: '删除',
      adminMode: '管理员模式'
    },
    achievements: {
      title: '个人成就',
      subtitle: '比赛荣誉与执教履历。',
      coachingTitle: '执教档案',
      gradeLabel: '运动员等级',
      baseLabel: '训练基地',
      focusLabel: '教学重点',
      primaryBadge: '常驻'
    },
    social: {
        title: '全网矩阵',
        subtitle: '关注全平台的精彩内容。',
        followers: '粉丝',
        visit: '访问',
        add: '添加链接',
        edit: '编辑链接',
        form: {
            platform: '平台',
            handle: '账号 / 用户名',
            url: '链接地址',
            followers: '粉丝数量'
        }
    },
    schedule: {
      title: '内容排期',
      subtitle: '拍摄日、剪辑时段和比赛安排。',
      sync: '同步日历',
      addEvent: '添加事件',
      editEvent: '编辑事件',
      save: '保存更改',
      delete: '删除',
      days: {
        Mon: '周一', Tue: '周二', Wed: '周三', Thu: '周四', Fri: '周五', Sat: '周六', Sun: '周日'
      },
      types: {
          match: '比赛',
          training: '日常训练',
          tournament: '锦标赛'
      },
      form: {
          day: '日期',
          time: '时间',
          title: '标题',
          type: '类型',
          location: '地点',
          details: '详情'
      }
    },
    contact: {
      title: "商务合作",
      desc: "品牌推广、赞助或表演赛？让我们一起打造爆款内容。",
      cta: '联系我',
      rights: '版权所有'
    },
    ai: {
      greeting: "嘿！我是Rilliex的AI机器人。问我关于他的球拍配置、最新视频或花式击球技巧。",
      placeholder: "问问关于胯下击球...",
      title: "Rilliex AI"
    },
    admin: {
      loginTitle: '创作者登录',
      passwordPlaceholder: '输入密码',
      loginBtn: '解锁',
      logoutBtn: '锁定',
      uploadTitle: '上传媒体',
      captionPlaceholder: '输入标题...',
      categoryLabel: '分类',
      fileLabel: '选择文件',
      cancel: '取消',
      save: '保存'
    },
    editor: {
      title: '编辑媒体',
      zoom: '缩放',
      drag: '拖拽图片调整位置',
      captionEn: '英文描述',
      captionZh: '中文描述',
      save: '保存更改',
      cancel: '取消'
    }
  }
};