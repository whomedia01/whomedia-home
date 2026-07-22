import React, { useState } from 'react';
import { MediaItem, MediaType, CategoryType } from '../types';
import { INITIAL_CREATORS } from '../data/mockData';
import { 
  PlusCircle, 
  UploadCloud, 
  Sparkles, 
  FileText, 
  Video, 
  Headphones, 
  Radio, 
  Check, 
  Trash2, 
  Tag, 
  Wand2, 
  Layers
} from 'lucide-react';

interface CreatorStudioProps {
  onPublishMedia: (item: MediaItem) => void;
  publishedItems: MediaItem[];
  onDeleteMedia: (id: string) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  onPublishMedia,
  publishedItems,
  onDeleteMedia
}) => {
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('Tech & AI');
  const [tagsInput, setTagsInput] = useState('AI, Tech, WhoMedia');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80');
  
  // AI Generation Loading States
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Call Gemini AI Assistant API for Title Ideas
  const handleAIGenerateTitles = async () => {
    if (!title.trim() && !description.trim()) {
      alert("Please enter a topic keyword in Title or Description first!");
      return;
    }
    setIsGeneratingTitles(true);
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateTitle',
          topic: title || description || category
        })
      });
      const data = await res.json();
      if (data.data?.titles) {
        setGeneratedTitles(data.data.titles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  // Call Gemini AI Assistant API for Description
  const handleAIGenerateDescription = async () => {
    setIsGeneratingDesc(true);
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateDescription',
          topic: title || category,
          mediaTitle: title,
          mediaType
        })
      });
      const data = await res.json();
      if (data.data?.description) {
        setDescription(data.data.description);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  // Call Gemini AI Assistant API for Script Outline
  const handleAIGenerateScript = async () => {
    setIsGeneratingScript(true);
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateScript',
          topic: title || category
        })
      });
      const data = await res.json();
      if (data.data?.script) {
        setGeneratedScript(data.data.script);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title for your media upload!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);

          const newItem: MediaItem = {
            id: `m-${Date.now()}`,
            title: title.trim(),
            description: description.trim() || 'Uploaded via WhoMedia Creator Studio.',
            type: mediaType,
            thumbnail: thumbnailUrl,
            mediaUrl: mediaType === 'audio' 
              ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
              : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: mediaType === 'article' ? '5 min read' : '10:00',
            durationSeconds: 600,
            views: '0',
            viewsCount: 0,
            likes: 1,
            publishedAt: 'Just now',
            category,
            creator: INITIAL_CREATORS[0], // User's creator profile
            tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
            comments: []
          };

          onPublishMedia(newItem);
          alert("🎉 Congratulations! Your media has been published to WhoMedia!");
          setTitle('');
          setDescription('');
          setGeneratedTitles([]);
          setGeneratedScript(null);
          setUploadProgress(0);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div id="creator-studio-view" className="space-y-8 max-w-6xl mx-auto">
      
      {/* Banner Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-purple-950/40 border border-indigo-500/20 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Wand2 className="w-4 h-4" />
            WhoMedia Studio Engine
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100">Creator Studio & AI Copilot</h1>
          <p className="text-xs text-zinc-400 mt-1">Publish videos, podcasts, and articles with automated AI metadata and scripts.</p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-semibold text-zinc-200">Gemini 2.5 Active</span>
        </div>
      </div>

      {/* Main Publishing Form & AI Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Inputs (2 Cols) */}
        <form onSubmit={handlePublish} className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-indigo-400" />
            1. Select Media Type & File
          </h2>

          {/* Type Selector Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { type: 'video', label: 'Video', icon: Video, color: 'text-blue-400' },
              { type: 'audio', label: 'Audio/Podcast', icon: Headphones, color: 'text-violet-400' },
              { type: 'article', label: 'Article', icon: FileText, color: 'text-emerald-400' },
              { type: 'live', label: 'Live Stream', icon: Radio, color: 'text-red-500' }
            ].map(item => {
              const Icon = item.icon;
              const isSel = mediaType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setMediaType(item.type as MediaType)}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    isSel 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Drag & Drop Simulation Box */}
          <div className="p-6 border-2 border-dashed border-zinc-800 hover:border-indigo-500/50 rounded-2xl bg-zinc-950/40 text-center transition-colors">
            <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-zinc-200">Drag & drop your {mediaType} file here</p>
            <p className="text-[10px] text-zinc-500 mt-1">Supports MP4, MOV, MP3, WAV, Markdown up to 2GB</p>
          </div>

          {/* Title Input & AI Title Assistant */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-200">Media Title</label>
              <button
                type="button"
                onClick={handleAIGenerateTitles}
                disabled={isGeneratingTitles}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {isGeneratingTitles ? 'Generating Title Ideas...' : 'AI Title Generator'}
              </button>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Future of AI Content Creation"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />

            {/* Generated Titles Picker */}
            {generatedTitles.length > 0 && (
              <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-1.5 mt-2">
                <p className="text-[10px] font-bold text-indigo-300 uppercase">Select AI Title Recommendation:</p>
                {generatedTitles.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setTitle(t.replace(/^["'\d.\s]+|["'\s]+$/g, ''))}
                    className="p-2 bg-zinc-900/90 hover:bg-indigo-600/30 rounded-lg text-xs text-zinc-200 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <span>{t}</span>
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description Input & AI Description Assistant */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-200">Description & Timestamps</label>
              <button
                type="button"
                onClick={handleAIGenerateDescription}
                disabled={isGeneratingDesc}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {isGeneratingDesc ? 'Writing Description...' : 'AI Auto-Write Description'}
              </button>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, key takeaways, or timestamps for your audience..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-200 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
              >
                {['Tech & AI', 'Entertainment', 'Podcasts', 'Documentaries', 'Live', 'Culture', 'Design'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-200 block mb-1.5">Tags (Comma Separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Tech, Future, WhoMedia"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Upload Progress Bar if active */}
          {isUploading && (
            <div className="space-y-1.5 p-3 bg-zinc-950 rounded-xl border border-indigo-500/30">
              <div className="flex justify-between text-xs text-indigo-300 font-medium">
                <span>Uploading & Encoding to WhoMedia CDN...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Publish Media to WhoMedia
          </button>

        </form>

        {/* Right Side: AI Video Script Assistant & Drafts Manager */}
        <div className="space-y-6">
          
          {/* AI Script Assistant Widget */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI Video Script Outline
              </h3>
              <button
                onClick={handleAIGenerateScript}
                disabled={isGeneratingScript}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold text-[10px] hover:bg-indigo-600/30 transition-colors"
              >
                {isGeneratingScript ? 'Writing Script...' : 'Generate Script'}
              </button>
            </div>
            <p className="text-[11px] text-zinc-400">Generate a 4-scene video script outline with visual cues and monologue timing.</p>

            {generatedScript ? (
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] text-zinc-300 max-h-60 overflow-y-auto whitespace-pre-line font-mono">
                {generatedScript}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/80 text-center text-[11px] text-zinc-500 italic">
                Click "Generate Script" to create an AI outline for your media.
              </div>
            )}
          </div>

          {/* Published Uploads Manager */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Your Published Media ({publishedItems.length})
            </h3>

            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {publishedItems.map(item => (
                <div key={item.id} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.thumbnail} alt={item.title} className="w-10 h-8 object-cover rounded-md flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-zinc-200 truncate">{item.title}</p>
                      <p className="text-[10px] text-zinc-500">{item.views} views • {item.publishedAt}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMedia(item.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Delete Upload"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
