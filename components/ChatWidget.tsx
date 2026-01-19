
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Language } from '../types';
import { translations } from '../translations';

interface ChatWidgetProps {
  lang: Language;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      text: lang === 'hr' 
        ? 'Dobar dan. Ja sam Nor Din AI asistent. Kako vam mogu pomoći s informacijama o našoj tvrtki?' 
        : 'Hello. I am the Nor Din AI assistant. How can I assist you with information about our company today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await geminiService.getConstructionAdvice(userMessage, lang);
      setMessages(prev => [...prev, { role: 'ai', text: response || (lang === 'hr' ? 'Oprostite, došlo je do pogreške.' : 'Sorry, there was an error.') }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[350px] md:w-[420px] h-[450px] md:h-[550px] glass-card rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-amber-500/30 animate-bounce-in border">
          {/* Header */}
          <div className="accent-gradient p-4 md:p-6 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold tracking-tight text-sm md:text-lg leading-none">Nor Din Intel</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-90 font-bold">Powered by AI</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 scroll-smooth bg-slate-50/50 dark:bg-transparent"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-4 py-2.5 md:px-5 md:py-3 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-black/5 dark:border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-black/5 dark:border-white/5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10">
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.aiAdvisorPlaceholder}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-amber-500/50 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 pr-12 focus:outline-none transition-all text-xs md:text-sm dark:text-white shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-9 md:w-10 accent-gradient rounded-lg md:rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-all shadow-md"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
              <p className="text-[8px] md:text-[9px] text-center uppercase tracking-[0.2em] text-slate-400 font-bold">Nor Din Engineering AI Systems</p>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-18 md:h-18 rounded-2xl md:rounded-3xl accent-gradient flex items-center justify-center text-white shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all active:scale-95 group border-4 border-white dark:border-slate-900 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
