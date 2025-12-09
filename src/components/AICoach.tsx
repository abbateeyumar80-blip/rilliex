import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, User, Bot } from 'lucide-react';
import { Chat } from '@google/genai';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { t, language } = useLanguage();
  
  // Initialize greeting based on language
  useEffect(() => {
    // Reset messages only if empty or if we want to force language update on initial load
    // For simplicity, we just add the localized greeting if the chat is empty
    if (messages.length === 0) {
        setMessages([{ role: 'model', text: t.ai.greeting }]);
    }
  }, [t.ai.greeting]); // Update when language changes if we want to, but standard chat UX is to keep history.
  // Better UX: Don't clear history on lang change, but maybe system prompt should update?
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!chatSessionRef.current) {
        try {
            chatSessionRef.current = createChatSession(language);
        } catch (e) {
            console.error("Failed to init chat session", e);
        }
    }
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Re-create session if language changed heavily or just rely on prompt context
    if (!chatSessionRef.current) {
         chatSessionRef.current = createChatSession(language);
    }

    const reply = await sendMessageToGemini(chatSessionRef.current, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-tennis-green text-black p-4 rounded-full shadow-lg hover:shadow-tennis-green/50 transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] glass-panel rounded-2xl flex flex-col transition-all duration-500 origin-bottom-right shadow-2xl ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-tennis-green to-lime-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{t.ai.title}</h3>
              <p className="text-xs text-tennis-green">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-tennis-green text-black rounded-tr-sm' 
                    : 'bg-[#2a2a2a] text-gray-200 border border-white/5 rounded-tl-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold tracking-wider">
                    {msg.role === 'user' ? <User className="w-3 h-3"/> : <Bot className="w-3 h-3" />}
                    {msg.role === 'user' ? (language === 'en' ? 'You' : '你') : (language === 'en' ? 'Assistant' : '助手')}
                </div>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-sm border border-white/5">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.ai.placeholder}
              className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-tennis-green transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-tennis-green/10 text-tennis-green rounded-full hover:bg-tennis-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICoach;