import React from 'react';
import { ActiveTab, MediaType } from '../types';
import { 
  Home, 
  Flame, 
  Radio, 
  Headphones, 
  PlusCircle, 
  Bookmark, 
  History, 
  Heart, 
  BarChart2, 
  Film,
  User,
  Compass
} from 'lucide-react';

interface NavigationSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedTypeFilter: MediaType | 'all';
  setSelectedTypeFilter: (type: MediaType | 'all') => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedTypeFilter,
  setSelectedTypeFilter
}) => {
  return (
    <aside id="whomedia-sidebar" className="w-64 bg-zinc-950/70 border-r border-zinc-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Main Feed Options */}
        <div>
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Feed & Discover
          </p>
          <div className="space-y-1">
            <button
              id="sidebar-feed"
              onClick={() => {
                setActiveTab('feed');
                setSelectedTypeFilter('all');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'feed' && selectedTypeFilter === 'all'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Home Feed
            </button>

            <button
              id="sidebar-trending"
              onClick={() => {
                setActiveTab('feed');
                setSelectedTypeFilter('all');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Trending Now
            </button>

            <button
              id="sidebar-live"
              onClick={() => {
                setActiveTab('feed');
                setSelectedTypeFilter('live');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'feed' && selectedTypeFilter === 'live'
                  ? 'bg-red-500/20 text-red-400 font-semibold border border-red-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Radio className="w-4 h-4 text-red-500" />
              Live Streams
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>

            <button
              id="sidebar-podcasts"
              onClick={() => {
                setActiveTab('feed');
                setSelectedTypeFilter('audio');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'feed' && selectedTypeFilter === 'audio'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Headphones className="w-4 h-4 text-violet-400" />
              Audio & Podcasts
            </button>

            <button
              id="sidebar-videos"
              onClick={() => {
                setActiveTab('feed');
                setSelectedTypeFilter('video');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'feed' && selectedTypeFilter === 'video'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Film className="w-4 h-4 text-blue-400" />
              Videos & Docs
            </button>
          </div>
        </div>

        {/* Creator Tools Section */}
        <div>
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Creator Workspaces
          </p>
          <div className="space-y-1">
            <button
              id="sidebar-studio"
              onClick={() => setActiveTab('studio')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'studio'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-indigo-400" />
              Creator Studio
            </button>

            <button
              id="sidebar-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Analytics & Insights
            </button>

            <button
              id="sidebar-profile"
              onClick={() => setActiveTab('creator-profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'creator-profile'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <User className="w-4 h-4 text-pink-400" />
              Channel Profile
            </button>
          </div>
        </div>

        {/* Personal Library Section */}
        <div>
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Personal Library
          </p>
          <div className="space-y-1">
            <button
              id="sidebar-library"
              onClick={() => setActiveTab('library')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'library'
                  ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              Playlists & Saved
            </button>

            <button
              id="sidebar-history"
              onClick={() => setActiveTab('library')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              <History className="w-4 h-4 text-cyan-400" />
              Viewing History
            </button>

            <button
              id="sidebar-liked"
              onClick={() => setActiveTab('library')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Liked Media
            </button>
          </div>
        </div>

      </div>

      {/* Footer Creator Badge */}
      <div className="p-3 bg-gradient-to-r from-zinc-900 to-indigo-950/40 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[11px] font-bold text-zinc-200">WhoMedia Pro Channel</span>
        </div>
        <p className="text-[10px] text-zinc-400">1.4M Subscribers • 12 Active Uploads</p>
      </div>

    </aside>
  );
};
