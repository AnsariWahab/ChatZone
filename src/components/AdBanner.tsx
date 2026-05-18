import { useState, useEffect } from 'react';
import { Ad } from '../types';

interface AdBannerProps {
  ads: Ad[];
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function AdBanner({ ads, variant = 'banner' }: AdBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % ads.length);
        setIsVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [ads.length]);

  if (ads.length === 0) return null;

  const ad = ads[currentIndex % ads.length];

  if (variant === 'banner') {
    return (
      <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
        <div className={`relative overflow-hidden bg-gradient-to-r ${ad.bgGradient} rounded-2xl p-4 shadow-lg`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl shrink-0">{ad.icon}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm truncate">{ad.title}</h3>
                <p className="text-white/80 text-xs truncate">{ad.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={ad.ctaLink}
                className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-lg transition-all whitespace-nowrap"
                onClick={(e) => e.preventDefault()}
              >
                {ad.ctaText}
              </a>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">Ad</span>
            </div>
          </div>
          {ads.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {ads.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex % ads.length ? 'bg-white w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`relative overflow-hidden bg-gradient-to-br ${ad.bgGradient} rounded-2xl p-5 shadow-lg`}>
          <div className="absolute top-2 right-2">
            <span className="text-white/30 text-[9px] uppercase tracking-widest font-medium bg-black/10 px-1.5 py-0.5 rounded">Sponsored</span>
          </div>
          <div className="text-center space-y-3 pt-2">
            <span className="text-5xl block">{ad.icon}</span>
            <div>
              <h3 className="font-bold text-white text-base">{ad.title}</h3>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">{ad.description}</p>
            </div>
            <a
              href={ad.ctaLink}
              className="inline-block px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold rounded-xl transition-all"
              onClick={(e) => e.preventDefault()}
            >
              {ad.ctaText}
            </a>
          </div>
          {ads.length > 1 && (
            <div className="flex justify-center gap-1 mt-3">
              {ads.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex % ads.length ? 'bg-white w-3' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline ad
  return (
    <div className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`relative overflow-hidden bg-gradient-to-r ${ad.bgGradient} rounded-xl p-3 shadow-md mx-4`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0">{ad.icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-xs truncate">{ad.title}</h4>
            <p className="text-white/70 text-[11px] truncate">{ad.description}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={ad.ctaLink}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold rounded-lg transition-all whitespace-nowrap"
              onClick={(e) => e.preventDefault()}
            >
              {ad.ctaText}
            </a>
            <span className="text-white/30 text-[9px]">Ad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
