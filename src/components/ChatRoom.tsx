import { useState, useRef, useEffect } from 'react';
import { ChatMessage, User, Ad } from '../types';
import AdBanner from './AdBanner';
import EmojiPicker from './EmojiPicker';

interface ChatRoomProps {
  user: User;
  messages: ChatMessage[];
  onlineUsers: User[];
  onSend: (text: string) => void;
  bannerAds: Ad[];
  sidebarAds: Ad[];
  inlineAds: Ad[];
  onOpenAdManager: () => void;
  onLogout: () => void;
}

function formatTime(ts: number) {
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(ts: number) {
  const date = new Date(ts);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString();
}

export default function ChatRoom({
  user,
  messages,
  onlineUsers,
  onSend,
  bannerAds,
  sidebarAds,
  inlineAds,
  onOpenAdManager,
  onLogout,
}: ChatRoomProps) {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
    inputRef.current?.focus();
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
    inputRef.current?.focus();
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  messages.forEach(msg => {
    const dateStr = formatDate(msg.timestamp);
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateStr, messages: [msg] });
    }
  });

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Top Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 py-3 shrink-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">ChatZone</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">{onlineUsers.length} online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdManager}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all text-sm"
              title="Manage Ads"
            >
              <span>📢</span>
              <span className="hidden md:inline">Ads</span>
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all text-sm"
            >
              <span>👥</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-sm text-white font-medium hidden sm:block">{user.username}</span>
              <button
                onClick={onLogout}
                className="text-slate-500 hover:text-red-400 transition-colors ml-1"
                title="Leave Chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Ad */}
      <div className="px-4 py-2 max-w-7xl mx-auto w-full shrink-0">
        <AdBanner ads={bannerAds} variant="banner" />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 max-w-7xl mx-auto w-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scroll-smooth">
            {groupedMessages.map((group, gi) => (
              <div key={group.date}>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span className="text-xs text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-full">{group.date}</span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>
                {group.messages.map((msg, mi) => {
                  const isOwn = msg.userId === user.id;
                  const showInlineAd = gi === 0 && mi > 0 && mi % 8 === 0 && inlineAds.length > 0;

                  return (
                    <div key={msg.id}>
                      {showInlineAd && (
                        <div className="my-3">
                          <AdBanner ads={inlineAds} variant="inline" />
                        </div>
                      )}
                      <div className={`flex gap-2.5 py-1.5 group hover:bg-slate-900/50 px-2 rounded-xl transition-colors ${isOwn ? 'flex-row-reverse' : ''}`}>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5"
                          style={{ backgroundColor: msg.avatarColor }}
                        >
                          {msg.username[0].toUpperCase()}
                        </div>
                        <div className={`max-w-[70%] ${isOwn ? 'text-right' : ''}`}>
                          <div className={`flex items-baseline gap-2 mb-0.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
                            <span className={`text-sm font-semibold ${isOwn ? 'text-violet-400' : 'text-slate-300'}`}>
                              {isOwn ? 'You' : msg.username}
                            </span>
                            <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <div className={`inline-block px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                            isOwn
                              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-md'
                              : 'bg-slate-800 text-slate-200 rounded-tl-md'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800 shrink-0">
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xl transition-all"
                >
                  😊
                </button>
                {showEmoji && (
                  <EmojiPicker
                    onSelect={handleEmojiSelect}
                    onClose={() => setShowEmoji(false)}
                  />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-sm"
                autoFocus
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white disabled:opacity-40 hover:from-violet-500 hover:to-indigo-500 transition-all active:scale-95 disabled:active:scale-100 shadow-lg shadow-violet-500/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${showSidebar ? 'fixed inset-y-0 right-0 z-30 shadow-2xl' : 'hidden'} lg:relative lg:block w-72 border-l border-slate-800 shrink-0 overflow-y-auto bg-slate-900 lg:bg-slate-900/50`}>
          <div className="p-4 space-y-5">
            {/* Online Users */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Online — {onlineUsers.length}
              </h3>
              <div className="space-y-1">
                {onlineUsers.map(u => (
                  <div
                    key={u.id}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: u.avatarColor }}
                      >
                        {u.username[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900" />
                    </div>
                    <span className={`text-sm truncate ${u.id === user.id ? 'text-violet-400 font-semibold' : 'text-slate-300'}`}>
                      {u.username} {u.id === user.id ? '(you)' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdBanner ads={sidebarAds} variant="sidebar" />

            {/* Room Info */}
            <div className="bg-slate-800/50 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Room Info</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Room</span>
                  <span className="text-slate-300">#general</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Messages</span>
                  <span className="text-slate-300">{messages.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-400 text-xs font-medium">🟢 Live</span>
                </div>
              </div>
            </div>

            {/* Ad Manager button (mobile) */}
            <button
              onClick={onOpenAdManager}
              className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all text-sm"
            >
              <span>📢</span>
              <span>Manage Ads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}
