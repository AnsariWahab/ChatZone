import { useState } from 'react';

const avatarColors = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#f43f5e', '#14b8a6', '#0ea5e9', '#a855f7', '#e11d48',
];

interface LoginScreenProps {
  onLogin: (username: string, avatarColor: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [selectedColor, setSelectedColor] = useState(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    if (trimmed.length > 20) {
      setError('Username must be 20 characters or less');
      return;
    }
    onLogin(trimmed, selectedColor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/30 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ChatZone</h1>
          <p className="text-slate-400 text-lg">Join the conversation. Chat with everyone!</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Choose your username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Enter a cool username..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                autoFocus
                maxLength={20}
              />
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Pick your avatar color
              </label>
              <div className="flex flex-wrap gap-2 justify-center">
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      selectedColor === color
                        ? 'ring-4 ring-white/50 scale-110 shadow-lg'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: selectedColor }}
              >
                {username.trim() ? username.trim()[0].toUpperCase() : '?'}
              </div>
              <div>
                <p className="text-white font-semibold">{username.trim() || 'Your Name'}</p>
                <p className="text-slate-400 text-sm">Ready to chat!</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-[0.98]"
            >
              Join Chat Room 🚀
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Live now — Join the conversation!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
