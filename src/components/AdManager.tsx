import { useState } from 'react';
import { Ad } from '../types';

interface AdManagerProps {
  ads: Ad[];
  onAdd: (ad: Omit<Ad, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Ad>) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onClose: () => void;
}

const gradientOptions = [
  { label: 'Blue → Cyan', value: 'from-blue-600 via-blue-500 to-cyan-400' },
  { label: 'Purple → Pink', value: 'from-purple-600 via-violet-500 to-pink-500' },
  { label: 'Orange → Red', value: 'from-orange-500 via-red-500 to-pink-500' },
  { label: 'Green → Teal', value: 'from-emerald-500 via-green-500 to-teal-400' },
  { label: 'Indigo → Sky', value: 'from-indigo-600 via-blue-600 to-sky-500' },
  { label: 'Rose → Fuchsia', value: 'from-rose-500 via-pink-500 to-fuchsia-500' },
  { label: 'Amber → Red', value: 'from-amber-500 via-orange-500 to-red-400' },
  { label: 'Slate → Zinc', value: 'from-slate-700 via-slate-600 to-zinc-500' },
];

const iconOptions = ['🚀', '☁️', '🎮', '📱', '🎓', '💼', '🎵', '🍕', '🛍️', '💎', '🎯', '⚡', '🔥', '🌟', '🎪', '🏆'];

export default function AdManager({ ads, onAdd, onRemove, onToggle, onClose }: AdManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ctaText: 'Learn More →',
    ctaLink: '#',
    bgGradient: gradientOptions[0].value,
    icon: '🚀',
    placement: 'banner' as Ad['placement'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    onAdd({ ...formData, active: true });
    setFormData({
      title: '',
      description: '',
      ctaText: 'Learn More →',
      ctaLink: '#',
      bgGradient: gradientOptions[0].value,
      icon: '🚀',
      placement: 'banner',
    });
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">📢 Ad Manager</h2>
            <p className="text-slate-400 text-sm mt-1">Create and manage your advertisements</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Create New Ad */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 border-2 border-dashed border-slate-600 rounded-2xl text-slate-400 hover:text-white hover:border-violet-500 transition-all flex items-center justify-center gap-2"
            >
              <span className="text-2xl">+</span>
              <span className="font-medium">Create New Ad</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-5 space-y-4 border border-slate-600">
              <h3 className="text-white font-semibold">New Advertisement</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Ad Title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">CTA Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData(f => ({ ...f, ctaText: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Learn More →"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Brief ad description..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">CTA Link</label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData(f => ({ ...f, ctaLink: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Placement</label>
                  <select
                    value={formData.placement}
                    onChange={(e) => setFormData(f => ({ ...f, placement: e.target.value as Ad['placement'] }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="banner">Top Banner</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="inline">Inline (in chat)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Color Gradient</label>
                <div className="flex flex-wrap gap-2">
                  {gradientOptions.map(g => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, bgGradient: g.value }))}
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.value} transition-all ${formData.bgGradient === g.value ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                      title={g.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, icon }))}
                      className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl transition-all ${formData.icon === icon ? 'ring-2 ring-violet-500 bg-slate-600' : 'hover:bg-slate-600'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all text-sm"
                >
                  Create Ad
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Existing Ads */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Active Ads ({ads.filter(a => a.active).length})</h3>
            {ads.map(ad => (
              <div
                key={ad.id}
                className={`flex items-center gap-4 bg-slate-800 rounded-xl p-4 border transition-all ${ad.active ? 'border-slate-600' : 'border-slate-700 opacity-50'}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ad.bgGradient} flex items-center justify-center text-2xl shrink-0`}>
                  {ad.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">{ad.title}</h4>
                  <p className="text-slate-400 text-xs truncate">{ad.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                      ad.placement === 'banner' ? 'bg-blue-500/20 text-blue-400' :
                      ad.placement === 'sidebar' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {ad.placement}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${ad.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {ad.active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onToggle(ad.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all text-sm ${ad.active ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
                    title={ad.active ? 'Pause' : 'Activate'}
                  >
                    {ad.active ? '⏸' : '▶️'}
                  </button>
                  <button
                    onClick={() => onRemove(ad.id)}
                    className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-all text-sm"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
