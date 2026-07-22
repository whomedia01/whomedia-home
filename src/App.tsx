import React, { useState } from 'react';
import { 
  ActiveTab, 
  CategoryType, 
  MediaItem, 
  MediaType, 
  Playlist 
} from './types';
import { 
  INITIAL_MEDIA_ITEMS, 
  INITIAL_PLAYLISTS, 
  INITIAL_CREATORS 
} from './data/mockData';
import { Header } from './components/Header';
import { NavigationSidebar } from './components/NavigationSidebar';
import { CategoryPills } from './components/CategoryPills';
import { MediaCard } from './components/MediaCard';
import { MediaPlayerModal } from './components/MediaPlayerModal';
import { GlobalAudioPlayerBar } from './components/GlobalAudioPlayerBar';
import { CreatorStudio } from './components/CreatorStudio';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { LibraryView } from './components/LibraryView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { 
  Sparkles, 
  Flame, 
  PlayCircle, 
  CheckCircle, 
  Radio, 
  Layers 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<MediaType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Media State
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [savedMediaIds, setSavedMediaIds] = useState<string[]>(['m1', 'm2']);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  
  // Active Media Player Modal State
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  
  // Persistent Global Audio State
  const [globalAudioMedia, setGlobalAudioMedia] = useState<MediaItem | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  // AI Copilot Drawer State
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Category List
  const categories: CategoryType[] = [
    'All', 
    'Tech & AI', 
    'Entertainment', 
    'Podcasts', 
    'Documentaries', 
    'Live', 
    'Culture', 
    'Design'
  ];

  // Filtering Media
  const filteredMedia = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedTypeFilter === 'all' || item.type === selectedTypeFilter;
    const matchesSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesType && matchesSearch;
  });

  const featuredMedia = mediaItems.find(m => m.isFeatured) || mediaItems[0];

  const handleSelectMedia = (item: MediaItem) => {
    if (item.type === 'audio') {
      setGlobalAudioMedia(item);
      setIsAudioPlaying(true);
    }
    setActiveMedia(item);
  };

  const handleBookmarkToggle = (item: MediaItem) => {
    if (savedMediaIds.includes(item.id)) {
      setSavedMediaIds(savedMediaIds.filter(id => id !== item.id));
    } else {
      setSavedMediaIds([...savedMediaIds, item.id]);
    }
  };

  const handlePublishMedia = (newItem: MediaItem) => {
    setMediaItems([newItem, ...mediaItems]);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaItems(mediaItems.filter(m => m.id !== id));
  };

  const handleCreatePlaylist = (title: string, description: string) => {
    const newPl: Playlist = {
      id: `p-${Date.now()}`,
      title,
      description,
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
      mediaIds: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPlaylists([newPl, ...playlists]);
  };

  return (
    <div id="whomedia-app-root" className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mediaItems={mediaItems}
        onSelectMedia={handleSelectMedia}
        onOpenAIAssistant={() => setIsAIOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        
        {/* Navigation Sidebar */}
        <NavigationSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTypeFilter={selectedTypeFilter}
          setSelectedTypeFilter={setSelectedTypeFilter}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
          
          {/* VIEW 1: MEDIA FEED & DISCOVER */}
          {activeTab === 'feed' && (
            <div className="space-y-8">
              
              {/* Featured Media Spotlight Hero */}
              {selectedCategory === 'All' && selectedTypeFilter === 'all' && !searchQuery && (
                <div 
                  onClick={() => handleSelectMedia(featuredMedia)}
                  className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-zinc-900 border border-zinc-800 shadow-2xl cursor-pointer group"
                >
                  <img
                    src={featuredMedia.thumbnail}
                    alt={featuredMedia.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="max-w-2xl space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-indigo-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider">
                          FEATURED SPOTLIGHT
                        </span>
                        <span className="bg-purple-600/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          WhoMedia Original
                        </span>
                      </div>

                      <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight">
                        {featuredMedia.title}
                      </h1>

                      <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2">
                        {featuredMedia.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
                        <span className="font-bold text-zinc-200">{featuredMedia.creator.name}</span>
                        <span>•</span>
                        <span>{featuredMedia.views} views</span>
                        <span>•</span>
                        <span>{featuredMedia.publishedAt}</span>
                      </div>
                    </div>

                    <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-indigo-600/40 hover:scale-105 transition-all self-start sm:self-auto flex-shrink-0">
                      <PlayCircle className="w-5 h-5 fill-white text-indigo-600" />
                      Watch Now
                    </button>
                  </div>
                </div>
              )}

              {/* Category Pills Bar */}
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Media Grid Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    {selectedCategory === 'All' ? 'Latest Broadcasts & Tracks' : `${selectedCategory} Media`}
                  </h2>
                  <span className="text-xs text-zinc-500">{filteredMedia.length} Media Items</span>
                </div>

                {filteredMedia.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia.map(item => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        onPlay={handleSelectMedia}
                        onBookmarkToggle={handleBookmarkToggle}
                        isBookmarked={savedMediaIds.includes(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-2">
                    <p className="text-sm font-bold text-zinc-300">No media items found</p>
                    <p className="text-xs text-zinc-500">Try adjusting your search or selecting a different category pill.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* VIEW 2: CREATOR STUDIO */}
          {activeTab === 'studio' && (
            <CreatorStudio
              onPublishMedia={handlePublishMedia}
              publishedItems={mediaItems}
              onDeleteMedia={handleDeleteMedia}
            />
          )}

          {/* VIEW 3: ANALYTICS DASHBOARD */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard />
          )}

          {/* VIEW 4: PERSONAL LIBRARY */}
          {activeTab === 'library' && (
            <LibraryView
              savedItems={mediaItems.filter(m => savedMediaIds.includes(m.id))}
              allMedia={mediaItems}
              playlists={playlists}
              onCreatePlaylist={handleCreatePlaylist}
              onSelectMedia={handleSelectMedia}
              onRemoveSaved={handleBookmarkToggle}
            />
          )}

          {/* VIEW 5: CREATOR CHANNEL PROFILE */}
          {activeTab === 'creator-profile' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/1] bg-zinc-900 border border-zinc-800">
                <img src={INITIAL_CREATORS[0].banner} alt="Banner" className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 px-6 relative z-10">
                <div className="flex items-end gap-4">
                  <img
                    src={INITIAL_CREATORS[0].avatar}
                    alt={INITIAL_CREATORS[0].name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-zinc-950 border border-indigo-500/40 shadow-xl"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-zinc-100">{INITIAL_CREATORS[0].name}</h1>
                      <CheckCircle className="w-4 h-4 text-indigo-400" />
                    </div>
                    <p className="text-xs text-zinc-400">{INITIAL_CREATORS[0].handle} • {INITIAL_CREATORS[0].subscribers} subscribers</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('studio')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Manage Channel in Studio
                </button>
              </div>

              <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
                <p className="text-xs text-zinc-300 leading-relaxed">{INITIAL_CREATORS[0].bio}</p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Active Media Player Detail Modal */}
      <MediaPlayerModal
        item={activeMedia}
        onClose={() => setActiveMedia(null)}
        relatedMedia={mediaItems}
        onSelectMedia={handleSelectMedia}
        onBookmarkToggle={handleBookmarkToggle}
        isBookmarked={activeMedia ? savedMediaIds.includes(activeMedia.id) : false}
      />

      {/* Global Audio Player Bar */}
      <GlobalAudioPlayerBar
        item={globalAudioMedia}
        isPlaying={isAudioPlaying}
        onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
        onClose={() => setGlobalAudioMedia(null)}
        onExpand={() => {
          if (globalAudioMedia) setActiveMedia(globalAudioMedia);
        }}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

    </div>
  );
}
