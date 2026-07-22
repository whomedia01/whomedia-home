import React from 'react';
import { MediaItem } from '../types';
import { 
  Play, 
  Headphones, 
  Radio, 
  FileText, 
  CheckCircle, 
  Heart, 
  Bookmark, 
  MoreVertical,
  Flame,
  Sparkles
} from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  onBookmarkToggle?: (item: MediaItem) => void;
  isBookmarked?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onPlay,
  onBookmarkToggle,
  isBookmarked = false
}) => {
  const getTypeBadge = () => {
    switch (item.type) {
      case 'live':
        return (
          <span className="bg-red-600/90 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <Radio className="w-3 h-3 animate-pulse" />
            LIVE
          </span>
        );
      case 'audio':
        return (
          <span className="bg-violet-600/90 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <Headphones className="w-3 h-3" />
            AUDIO
          </span>
        );
      case 'article':
        return (
          <span className="bg-emerald-600/90 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <FileText className="w-3 h-3" />
            ARTICLE
          </span>
        );
      default:
        return (
          <span className="bg-black/70 text-zinc-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
            {item.duration}
          </span>
        );
    }
  };

  return (
    <div 
      id={`media-card-${item.id}`}
      className="group bg-zinc-900/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 hover:shadow-xl hover:shadow-indigo-950/20 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Container */}
        <div 
          onClick={() => onPlay(item)}
          className="relative aspect-video w-full bg-zinc-950 overflow-hidden cursor-pointer"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

          {/* Badges on Thumbnail */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {item.isTrending && (
              <span className="bg-amber-500/90 text-zinc-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 fill-zinc-950" />
                TRENDING
              </span>
            )}
            {item.isExclusive && (
              <span className="bg-purple-600/90 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                EXCLUSIVE
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-2.5 z-10">
            {getTypeBadge()}
          </div>

          {/* Hover Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-zinc-950/40 backdrop-blur-[2px] transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <div className="flex gap-3">
            {/* Creator Avatar */}
            <img
              src={item.creator.avatar}
              alt={item.creator.name}
              className="w-9 h-9 rounded-full object-cover border border-zinc-800 flex-shrink-0 mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <h3 
                onClick={() => onPlay(item)}
                className="text-xs sm:text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 cursor-pointer hover:text-indigo-400 transition-colors"
              >
                {item.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-400">
                <span className="font-medium text-zinc-300 truncate">{item.creator.name}</span>
                {item.creator.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 fill-indigo-400/20" />
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1">
                <span>{item.views} views</span>
                <span>•</span>
                <span>{item.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 pb-3 pt-1 flex items-center justify-between border-t border-zinc-800/40 text-[11px] text-zinc-400">
        <span className="px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400 text-[10px] font-medium">
          {item.category}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onBookmarkToggle?.(item)}
            className={`p-1.5 rounded-lg hover:bg-zinc-800 transition-colors ${
              isBookmarked ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Save to Library"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
          
          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
            <Heart className="w-3.5 h-3.5 text-rose-500/80" />
            <span>{item.likes >= 1000 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
