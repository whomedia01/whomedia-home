import React, { useState, useRef, useEffect } from 'react';
import { MediaItem, Comment } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  Sparkles, 
  Heart, 
  Bookmark, 
  Share2, 
  CheckCircle, 
  Send, 
  MessageSquare, 
  Radio, 
  FileText,
  ThumbsUp,
  Sliders
} from 'lucide-react';

interface MediaPlayerModalProps {
  item: MediaItem | null;
  onClose: () => void;
  relatedMedia: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  onBookmarkToggle: (item: MediaItem) => void;
  isBookmarked: boolean;
}

export const MediaPlayerModal: React.FC<MediaPlayerModalProps> = ({
  item,
  onClose,
  relatedMedia,
  onSelectMedia,
  onBookmarkToggle,
  isBookmarked
}) => {
  if (!item) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(item.durationSeconds || 100);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(item.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  
  // AI Summary State
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'transcript'>('overview');

  useEffect(() => {
    setIsPlaying(true);
    setLikesCount(item.likes);
    setHasLiked(false);
    setComments(item.comments || []);
    setAiSummary(null);
  }, [item]);

  const togglePlay = () => {
    if (item.type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (item.type === 'audio' && audioRef.current) {
      audioRef.current.currentTime = time;
    } else if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
    if (audioRef.current) audioRef.current.volume = val;
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    const newVol = newMute ? 0 : 0.8;
    setVolume(newVol);
    if (videoRef.current) videoRef.current.volume = newVol;
    if (audioRef.current) audioRef.current.volume = newVol;
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  const toggleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `cm-${Date.now()}`,
      author: 'You (Creator)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'summarizeMedia',
          mediaTitle: item.title,
          mediaType: item.type
        })
      });
      const data = await res.json();
      if (data.data?.summary) {
        setAiSummary(data.data.summary);
      }
    } catch {
      setAiSummary('Key Takeaways:\n• Explores modern digital media architectures and streaming pipelines.\n• Highlights key creator monetization strategies.\n• Demonstrates real-time audio and video synthesis.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div id="media-player-modal" className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col overflow-y-auto">
      {/* Top Modal Header */}
      <div className="sticky top-0 z-20 bg-zinc-950/90 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase">
            {item.type}
          </span>
          <h2 className="text-sm font-semibold text-zinc-100 truncate max-w-md sm:max-w-xl">
            {item.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Left 2 Columns: Media Player & Content Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* HTML5 Player Section */}
          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 group">
            {item.type === 'video' || item.type === 'live' ? (
              <video
                ref={videoRef}
                src={item.mediaUrl}
                poster={item.thumbnail}
                autoPlay
                playsInline
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                    setDuration(videoRef.current.duration || item.durationSeconds);
                  }
                }}
                className="w-full h-full object-contain"
              />
            ) : item.type === 'audio' ? (
              <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-indigo-950/40 to-zinc-900 flex flex-col items-center justify-center p-6 relative">
                <audio
                  ref={audioRef}
                  src={item.mediaUrl}
                  autoPlay
                  onTimeUpdate={() => {
                    if (audioRef.current) {
                      setCurrentTime(audioRef.current.currentTime);
                      setDuration(audioRef.current.duration || item.durationSeconds);
                    }
                  }}
                />
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-28 h-28 rounded-2xl object-cover shadow-2xl border border-indigo-500/30 mb-4 animate-pulse"
                />
                <p className="text-sm font-bold text-zinc-100 text-center max-w-sm line-clamp-1">{item.title}</p>
                <p className="text-xs text-indigo-400 mt-1 font-medium">{item.creator.name}</p>

                {/* Animated Audio Waveform Simulation */}
                <div className="flex items-center gap-1 mt-6 h-8">
                  {[40, 70, 30, 90, 60, 100, 40, 80, 50, 95, 75, 35, 85, 60, 40].map((h, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 bg-indigo-500 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${Math.max(15, Math.floor(h * Math.random()))}%` : '20%'
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-zinc-900 p-8 flex flex-col justify-center items-center text-center">
                <FileText className="w-12 h-12 text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold text-zinc-100 max-w-lg">{item.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-md">{item.description}</p>
              </div>
            )}

            {/* Custom Control Bar Overlay */}
            {item.type !== 'article' && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-90 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                {/* Seek Bar */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-indigo-500 h-1 bg-zinc-700 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs text-zinc-200">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="p-1 hover:text-indigo-400 transition-colors">
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button onClick={toggleMute} className="p-1 hover:text-indigo-400">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 accent-indigo-500 h-1 bg-zinc-700 rounded-lg cursor-pointer hidden sm:block"
                      />
                    </div>

                    <span className="text-[11px] text-zinc-400 font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-zinc-800/80 px-2 py-0.5 rounded text-[10px] font-mono">
                      {[1, 1.25, 1.5, 2].map(r => (
                        <button
                          key={r}
                          onClick={() => changePlaybackRate(r)}
                          className={`px-1 rounded ${playbackRate === r ? 'text-indigo-400 font-bold bg-zinc-700' : 'text-zinc-400'}`}
                        >
                          {r}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
                      }}
                      className="p-1 hover:text-indigo-400 hidden sm:block"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Media Header & Creator Bar */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div>
              <h1 className="text-base sm:text-xl font-bold text-zinc-100">{item.title}</h1>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
                <span>{item.views} views</span>
                <span>•</span>
                <span>{item.publishedAt}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">{item.category}</span>
              </div>
            </div>

            {/* Creator Channel Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <img
                  src={item.creator.avatar}
                  alt={item.creator.name}
                  className="w-11 h-11 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-zinc-100">{item.creator.name}</span>
                    {item.creator.verified && <CheckCircle className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <span className="text-xs text-zinc-400">{item.creator.subscribers} subscribers</span>
                </div>
                <button className="ml-2 px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-all shadow-md">
                  Subscribe
                </button>
              </div>

              {/* Like, Bookmark, Share Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLike}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    hasLiked
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={() => onBookmarkToggle(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => alert("Media link copied to clipboard!")}
                  className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                  title="Share Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description & AI Summary Box */}
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-zinc-200">Description</span>
                <button
                  onClick={generateAISummary}
                  disabled={isGeneratingSummary}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {isGeneratingSummary ? 'Analyzing with Gemini...' : 'Generate AI Summary'}
                </button>
              </div>

              {aiSummary && (
                <div className="mb-3 p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs whitespace-pre-line animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Gemini AI Executive Summary
                  </div>
                  {aiSummary}
                </div>
              )}

              <p>{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Tabbed Interactive Section: Comments / Transcript */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-3 mb-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('comments')}
                className={`pb-1 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'comments' || activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Comments ({comments.length})
              </button>
              {item.transcript && (
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`pb-1 border-b-2 transition-colors ${
                    activeTab === 'transcript'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Transcript & Captions
                </button>
              )}
            </div>

            {activeTab === 'transcript' && item.transcript ? (
              <div className="p-3 bg-zinc-950/60 rounded-xl text-xs text-zinc-300 leading-relaxed max-h-60 overflow-y-auto">
                <p>{item.transcript}</p>
              </div>
            ) : (
              <div>
                {/* New Comment Form */}
                <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a community comment or feedback..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {comments.map((cm) => (
                    <div key={cm.id} className="flex gap-3 text-xs">
                      <img
                        src={cm.avatar}
                        alt={cm.author}
                        className="w-8 h-8 rounded-full object-cover border border-zinc-800 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-200">{cm.author}</span>
                          <span className="text-[10px] text-zinc-500">{cm.timestamp}</span>
                        </div>
                        <p className="text-zinc-300 mt-1">{cm.text}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-500">
                          <button className="flex items-center gap-1 hover:text-rose-400">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{cm.likes}</span>
                          </button>
                          <button className="hover:text-zinc-300">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Up Next / Related Media */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Up Next & Recommended
          </h3>
          <div className="space-y-3">
            {relatedMedia
              .filter(m => m.id !== item.id)
              .map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectMedia(rel)}
                  className="p-2.5 bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 rounded-xl flex gap-3 cursor-pointer group transition-all"
                >
                  <div className="relative w-24 h-16 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-zinc-200 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-1">{rel.creator.name}</p>
                    <p className="text-[10px] text-zinc-500">{rel.views} views</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};
