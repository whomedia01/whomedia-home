import { MediaItem, Creator, Playlist, AnalyticsMetric, TopContentMetric } from '../types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'WhoMedia Originals',
    handle: '@whomedia_official',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    subscribers: '1.4M',
    subscriberCount: 1420000,
    verified: true,
    bio: 'Official WhoMedia original documentaries, technology breakthroughs, and exclusive creator showcases.'
  },
  {
    id: 'c2',
    name: 'Future Pulse Podcast',
    handle: '@futurepulse',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    subscribers: '850K',
    subscriberCount: 850000,
    verified: true,
    bio: 'Deep dive conversations with tech leaders, AI researchers, and digital media visionaries.'
  },
  {
    id: 'c3',
    name: 'CyberAesthetic Studio',
    handle: '@cyber_aesthetic',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    subscribers: '410K',
    subscriberCount: 410000,
    verified: false,
    bio: 'Exploring modern UI design, motion graphics, and high-frequency digital aesthetics.'
  },
  {
    id: 'c4',
    name: 'Global News Beat',
    handle: '@globalnewsbeat',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    subscribers: '2.1M',
    subscriberCount: 2100000,
    verified: true,
    bio: 'Real-time global news coverage, live field streams, and investigative reporting.'
  }
];

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm1',
    title: 'The AI Revolution in Digital Content & Creator Economy 2026',
    description: 'Explore how generative artificial intelligence, neural video rendering, and decentralized media distribution are changing how creators produce and monetize content.',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '09:56',
    durationSeconds: 596,
    views: '248K',
    viewsCount: 248000,
    likes: 18400,
    publishedAt: '2 hours ago',
    category: 'Tech & AI',
    creator: INITIAL_CREATORS[0],
    tags: ['AI', 'Content Creation', 'Future Tech', 'Media'],
    isTrending: true,
    isFeatured: true,
    isExclusive: true,
    comments: [
      {
        id: 'cm1',
        author: 'Alex Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'The analysis on neural video streams is incredible. WhoMedia is setting new standards for media platforms!',
        timestamp: '1 hour ago',
        likes: 42
      },
      {
        id: 'cm2',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Super excited about the creator monetization tools mentioned at 04:12.',
        timestamp: '30 mins ago',
        likes: 19
      }
    ],
    transcript: 'Welcome to WhoMedia Originals. Today we examine how multi-modal AI systems and instant cloud rendering are democratizing video production...'
  },
  {
    id: 'm2',
    title: 'Future Pulse Ep. 84: Building Scalable Cloud Architecture with Modern Node.js',
    description: 'In this episode, we sit down with principal engineers to discuss microservice orchestration, zero-downtime deployment, and event-driven backend systems.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '24:15',
    durationSeconds: 1455,
    views: '112K',
    viewsCount: 112000,
    likes: 9200,
    publishedAt: 'Yesterday',
    category: 'Podcasts',
    creator: INITIAL_CREATORS[1],
    tags: ['Podcast', 'Cloud', 'Nodejs', 'Architecture'],
    isTrending: true,
    comments: [
      {
        id: 'cm3',
        author: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        text: 'Great listening during my morning run. Keep these episodes coming!',
        timestamp: '12 hours ago',
        likes: 15
      }
    ]
  },
  {
    id: 'm3',
    title: 'LIVE: Global Tech Summit Keynote & Live Q&A Stream',
    description: 'Live broadcasting direct from the San Francisco Innovation Center. Real-time product reveals, developer announcements, and audience questions.',
    type: 'live',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 'LIVE',
    durationSeconds: 0,
    views: '4.2K Watching',
    viewsCount: 4200,
    likes: 3100,
    publishedAt: 'Streaming now',
    category: 'Live',
    creator: INITIAL_CREATORS[3],
    tags: ['Live', 'Keynote', 'Innovation', 'TechSummit'],
    isTrending: true,
    comments: [
      {
        id: 'cm4',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        text: 'Checking in from London! Audio and video stream quality is pristine.',
        timestamp: 'Just now',
        likes: 8
      }
    ]
  },
  {
    id: 'm4',
    title: 'Mastering Minimalist Motion Graphics & Web Aesthetics',
    description: 'Learn step-by-step how to build buttery-smooth layout transitions, spatial typography, and responsive micro-interactions using modern motion engines.',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '14:20',
    durationSeconds: 860,
    views: '95K',
    viewsCount: 95000,
    likes: 8100,
    publishedAt: '3 days ago',
    category: 'Design',
    creator: INITIAL_CREATORS[2],
    tags: ['Design', 'Motion', 'UI/UX', 'Animation'],
    comments: []
  },
  {
    id: 'm5',
    title: 'Inside the Next Generation of Autonomous Media Networks',
    description: 'An in-depth article breakdown examining how automated recommendation engines and viewer preferences shape modern media consumption.',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
    mediaUrl: '',
    duration: '6 min read',
    durationSeconds: 360,
    views: '64K',
    viewsCount: 64000,
    likes: 4500,
    publishedAt: '4 days ago',
    category: 'Culture',
    creator: INITIAL_CREATORS[0],
    tags: ['Article', 'Media', 'Trends'],
    comments: []
  },
  {
    id: 'm6',
    title: 'Soundscapes of the Future: Ambient Audio Production',
    description: 'Relaxing ambient audio track synthesized with spatial audio frequencies. Perfect for focus, coding, and immersive study sessions.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '18:40',
    durationSeconds: 1120,
    views: '180K',
    viewsCount: 180000,
    likes: 15400,
    publishedAt: '1 week ago',
    category: 'Entertainment',
    creator: INITIAL_CREATORS[1],
    tags: ['Audio', 'Music', 'Ambient', 'Focus'],
    comments: []
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    title: 'Must Watch Tech Breakthroughs',
    description: 'Essential videos on artificial intelligence, cloud architecture, and media tech.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    mediaIds: ['m1', 'm4'],
    createdAt: '2026-07-01'
  },
  {
    id: 'p2',
    title: 'Daily Focus & Podcasts',
    description: 'Handpicked podcast episodes and relaxing audio tracks.',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80',
    mediaIds: ['m2', 'm6'],
    createdAt: '2026-07-10'
  }
];

export const MOCK_ANALYTICS_METRICS: AnalyticsMetric[] = [
  { date: 'Jul 15', views: 24500, watchTimeHours: 1820, subscribersGained: 410, revenueEst: 340 },
  { date: 'Jul 16', views: 31200, watchTimeHours: 2300, subscribersGained: 520, revenueEst: 420 },
  { date: 'Jul 17', views: 28900, watchTimeHours: 2150, subscribersGained: 480, revenueEst: 390 },
  { date: 'Jul 18', views: 42000, watchTimeHours: 3100, subscribersGained: 780, revenueEst: 580 },
  { date: 'Jul 19', views: 38400, watchTimeHours: 2890, subscribersGained: 650, revenueEst: 510 },
  { date: 'Jul 20', views: 51000, watchTimeHours: 3950, subscribersGained: 920, revenueEst: 720 },
  { date: 'Jul 21', views: 64800, watchTimeHours: 4820, subscribersGained: 1150, revenueEst: 890 }
];

export const MOCK_TOP_CONTENT: TopContentMetric[] = [
  { id: 'm1', title: 'The AI Revolution in Digital Content', views: 248000, likes: 18400, type: 'video', engagement: '9.4%' },
  { id: 'm6', title: 'Soundscapes of the Future: Ambient Audio', views: 180000, likes: 15400, type: 'audio', engagement: '8.8%' },
  { id: 'm2', title: 'Future Pulse Ep. 84: Scalable Cloud Architecture', views: 112000, likes: 9200, type: 'audio', engagement: '8.2%' },
  { id: 'm4', title: 'Mastering Minimalist Motion Graphics', views: 95000, likes: 8100, type: 'video', engagement: '8.5%' }
];
