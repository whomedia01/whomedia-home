import React from 'react';
import { MediaItem } from '../types';
import { Play, Pause, X, Volume2, Maximize2 } from 'lucide-react';

interface GlobalAudioPlayerBarProps {
  item: MediaItem | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onExpand: () => void;
}

export const GlobalAudioPlayerBar: React.FC<GlobalAudioPlayerBarProps> = ({
  item,
  isPlaying,
  onTogglePlay,
  onClose,
  onExpand
}) => {
  if (!item || item.type !== 'audio') return null;

  return (
    <div id="global-audio-bar" className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950/95 border-t border-indigo-500/30 backdrop-blur-xl px-4 py-2.5 shadow-2xl flex items-center justify-between gap-4">
      
      {/* Track info */}
      <div 
        onClick={onExpand}
        className="flex items-center gap-3 cursor-pointer group min-w-0"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-10 h-10 rounded-lg object-cover border border-indigo-500/30 flex-shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold text-zinc-100 truncate group-hover:text-indigo-400 transition-colors">
            {item.title}
          </p>
          <p className="text-[10px] text-indigo-400 font-medium truncate">{item.creator.name}</p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        <button
          onClick={onExpand}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors hidden sm:block"
          title="Expand Player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={onClose}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          title="Close Audio"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
