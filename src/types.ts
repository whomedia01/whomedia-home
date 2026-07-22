export type MediaType = 'video' | 'audio' | 'article' | 'live';

export type CategoryType = 
  | 'All' 
  | 'Tech & AI' 
  | 'Entertainment' 
  | 'Podcasts' 
  | 'Documentaries' 
  | 'Live' 
  | 'Culture' 
  | 'Design';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner?: string;
  subscribers: string;
  subscriberCount: number;
  verified: boolean;
  bio: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  thumbnail: string;
  mediaUrl: string;
  duration: string; // e.g. "12:45"
  durationSeconds: number;
  views: string;
  viewsCount: number;
  likes: number;
  publishedAt: string;
  category: CategoryType;
  creator: Creator;
  tags: string[];
  isTrending?: boolean;
  isFeatured?: boolean;
  isExclusive?: boolean;
  comments: Comment[];
  transcript?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  mediaIds: string[];
  createdAt: string;
  isPrivate?: boolean;
}

export interface AnalyticsMetric {
  date: string;
  views: number;
  watchTimeHours: number;
  subscribersGained: number;
  revenueEst: number;
}

export interface TopContentMetric {
  id: string;
  title: string;
  views: number;
  likes: number;
  type: MediaType;
  engagement: string;
}

export type ActiveTab = 'feed' | 'discover' | 'studio' | 'analytics' | 'library' | 'creator-profile';
