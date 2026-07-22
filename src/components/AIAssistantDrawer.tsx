import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Lightbulb, Zap } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "👋 Hi! I'm WhoMedia's AI Copilot. Ask me to generate video scripts, viral title ideas, audience growth tactics, or summarize any media!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    const promptText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chatCopilot',
          prompt: promptText
        })
      });
      const data = await res.json();
      const aiReply = data.data?.response || "I can help you craft engaging scripts, analyze view metrics, or write SEO descriptions.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "WhoMedia AI Assistant is active. Try asking: 'Give me 3 viral video ideas about AI in 2026'."
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (p: string) => {
    setInputText(p);
  };

  return (
    <div id="ai-assistant-drawer" className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-zinc-950/95 border-l border-indigo-500/30 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-2xl animate-slideLeft">
      
      {/* Drawer Header */}
      <div className="pb-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-amber-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-100">WhoMedia AI Copilot</h3>
            <p className="text-[10px] text-indigo-400 font-medium">Powered by Gemini 2.5</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 my-4 overflow-y-auto space-y-3 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 text-xs text-indigo-400 font-medium animate-pulse p-2">
            <Bot className="w-4 h-4" />
            <span>Gemini AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="mb-3 space-y-1">
        <p className="text-[10px] font-bold text-zinc-500 uppercase">Quick AI Prompts:</p>
        <div className="flex flex-wrap gap-1">
          {[
            '3 viral tech video ideas',
            'Write podcast intro script',
            'How to get 10k subscribers'
          ].map(qp => (
            <button
              key={qp}
              onClick={() => handleQuickPrompt(qp)}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-[10px] text-zinc-300 transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-zinc-800">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI Copilot anything..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
