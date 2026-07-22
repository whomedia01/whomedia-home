import React, { useState } from 'react';
import { ActiveTab, MediaItem } from '../types';
import { 
  Tv, 
  Search, 
  Sparkles, 
  PlusCircle, 
  BarChart2, 
  Bookmark, 
  Bell, 
  X,
  PlayCircle,
  Radio
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  mediaItems: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  mediaItems,
  onSelectMedia,
  onOpenAIAssistant
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchResults = searchQuery.trim().length > 0
    ? mediaItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header id="whomedia-header" className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Navigation Tabs */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Who<span className="text-indigo-400">Media</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-red-500/20 text-red-400 border border-red-500/30 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">Digital Media & Creator Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
            <button
              id="header-nav-feed"
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'feed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Media Feed
            </button>
            <button
              id="header-nav-studio"
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Creator Studio
            </button>
            <button
              id="header-nav-library"
              onClick={() => setActiveTab('library')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Library
            </button>
            <button
              id="header-nav-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search videos, podcasts, creators, tags..."
              className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl pl-10 pr-8 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-zinc-800 flex justify-between items-center text-[11px] text-zinc-400 font-medium">
                <span>Search Results ({searchResults.length})</span>
                <button 
                  onClick={() => setShowSearchResults(false)}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  Close
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-zinc-800/60">
                {searchResults.length > 0 ? (
                  searchResults.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectMedia(item);
                        setShowSearchResults(false);
                      }}
                      className="p-2.5 flex items-center gap-3 hover:bg-zinc-800/70 cursor-pointer transition-colors"
                    >
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-12 h-8 object-cover rounded-md bg-zinc-800 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-zinc-200 truncate">{item.title}</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                          <span>{item.creator.name}</span>
                          <span>•</span>
                          <span className="capitalize px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">{item.type}</span>
                          <span>•</span>
                          <span>{item.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500">
                    No media found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* AI Copilot Button */}
          <button
            id="open-ai-copilot-button"
            onClick={onOpenAIAssistant}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI Media Copilot</span>
          </button>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              id="notifications-button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-zinc-950"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800 font-semibold text-zinc-200">
                  <span>Notifications</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-mono">2 New</span>
                </div>
                <div className="divide-y divide-zinc-800/50 my-1">
                  <div className="py-2.5 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Radio className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">Global News Beat is live now</p>
                      <p className="text-[10px] text-zinc-400">Broadcasting live keynote coverage.</p>
                      <span className="text-[9px] text-zinc-500 mt-1 block">5 minutes ago</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">AI Assistant generated 5 titles</p>
                      <p className="text-[10px] text-zinc-400">Check your draft in Creator Studio.</p>
                      <span className="text-[9px] text-zinc-500 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div 
            onClick={() => setActiveTab('creator-profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-zinc-900 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
            />
          </div>

        </div>

      </div>
    </header>
  );
};
