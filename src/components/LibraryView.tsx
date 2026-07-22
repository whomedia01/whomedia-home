import React, { useState } from 'react';
import { MediaItem, Playlist } from '../types';
import { 
  Bookmark, 
  History, 
  Heart, 
  Plus, 
  FolderPlus, 
  Trash2, 
  PlayCircle 
} from 'lucide-react';

interface LibraryViewProps {
  savedItems: MediaItem[];
  allMedia: MediaItem[];
  playlists: Playlist[];
  onCreatePlaylist: (title: string, description: string) => void;
  onSelectMedia: (item: MediaItem) => void;
  onRemoveSaved: (item: MediaItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  savedItems,
  allMedia,
  playlists,
  onCreatePlaylist,
  onSelectMedia,
  onRemoveSaved
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'saved' | 'playlists' | 'history'>('saved');
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreatePlaylist(newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setShowNewPlaylistModal(false);
  };

  return (
    <div id="library-view" className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" />
            WhoMedia Library
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100">Saved Playlists & Collections</h1>
          <p className="text-xs text-zinc-400 mt-1">Access your saved videos, podcast bookmarks, and custom playlists anytime.</p>
        </div>

        <button
          onClick={() => setShowNewPlaylistModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <FolderPlus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'saved'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Saved Items ({savedItems.length})
        </button>

        <button
          onClick={() => setActiveSubTab('playlists')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'playlists'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          Custom Playlists ({playlists.length})
        </button>
      </div>

      {/* Content Rendering */}
      {activeSubTab === 'saved' && (
        <div>
          {savedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedItems.map(item => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 flex gap-3 group hover:border-zinc-700 transition-all">
                  <div 
                    onClick={() => onSelectMedia(item)}
                    className="relative w-28 h-20 bg-zinc-950 rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      {item.duration}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 
                        onClick={() => onSelectMedia(item)}
                        className="text-xs font-semibold text-zinc-100 line-clamp-2 cursor-pointer hover:text-amber-400 transition-colors"
                      >
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-1">{item.creator.name}</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-2">
                      <span>{item.views} views</span>
                      <button
                        onClick={() => onRemoveSaved(item)}
                        className="text-zinc-500 hover:text-rose-400 p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <Bookmark className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-sm font-bold text-zinc-300">No saved media yet</p>
              <p className="text-xs text-zinc-500 mt-1">Click the bookmark icon on any media item to save it here.</p>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map(pl => (
            <div key={pl.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all p-4 space-y-3">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 relative">
                <img src={pl.coverImage} alt={pl.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-10 h-10 text-amber-400 drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100">{pl.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{pl.description}</p>
                <p className="text-[10px] text-amber-400 font-mono mt-2">{pl.mediaIds.length} Items</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Playlist Modal */}
      {showNewPlaylistModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-zinc-100">Create New Playlist</h3>
            
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Playlist Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Favorite Tech Podcasts"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Optional description..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewPlaylistModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
