interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const emojiCategories = [
  {
    label: 'Smileys',
    emojis: ['😀', '😂', '🤣', '😊', '😍', '🥰', '😘', '😜', '🤪', '😎', '🤓', '🥳', '😤', '😢', '😭', '🤯', '😱', '🥺', '😴', '🤗'],
  },
  {
    label: 'Gestures',
    emojis: ['👋', '👍', '👎', '👏', '🙌', '🤝', '✌️', '🤞', '💪', '🫡', '🙏', '👊', '✊', '🤙', '👀', '❤️', '🔥', '⭐', '💯', '✨'],
  },
  {
    label: 'Objects',
    emojis: ['🎉', '🎊', '🎁', '🎮', '🎵', '🎸', '📱', '💻', '🎯', '⚽', '🏀', '🎬', '📚', '✈️', '🚀', '🌈', '☀️', '🌙', '🍕', '☕'],
  },
];

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-72 bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl overflow-hidden z-20">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
        <span className="text-sm font-medium text-slate-300">Emoji</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">✕</button>
      </div>
      <div className="p-3 max-h-60 overflow-y-auto space-y-3">
        {emojiCategories.map(cat => (
          <div key={cat.label}>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-medium">{cat.label}</p>
            <div className="flex flex-wrap gap-1">
              {cat.emojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => { onSelect(emoji); onClose(); }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
