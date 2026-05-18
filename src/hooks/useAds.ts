import { useState, useEffect, useCallback } from 'react';
import { Ad } from '../types';
import { defaultAds, ADS_VERSION } from '../data/defaultAds';
import { v4 as uuidv4 } from 'uuid';

const ADS_KEY = 'chatroom_ads';
const ADS_VERSION_KEY = 'chatroom_ads_version';

function getStoredAds(): Ad[] {
  try {
    const storedVersion = localStorage.getItem(ADS_VERSION_KEY);

    // If version changed or no version stored, reset to new default ads
    if (storedVersion !== ADS_VERSION) {
      localStorage.setItem(ADS_KEY, JSON.stringify(defaultAds));
      localStorage.setItem(ADS_VERSION_KEY, ADS_VERSION);
      return defaultAds;
    }

    const stored = localStorage.getItem(ADS_KEY);
    if (stored) return JSON.parse(stored);

    localStorage.setItem(ADS_KEY, JSON.stringify(defaultAds));
    return defaultAds;
  } catch {
    return defaultAds;
  }
}

export function useAds() {
  const [ads, setAds] = useState<Ad[]>(getStoredAds);

  useEffect(() => {
    localStorage.setItem(ADS_KEY, JSON.stringify(ads));
  }, [ads]);

  const addAd = useCallback((ad: Omit<Ad, 'id'>) => {
    const newAd: Ad = { ...ad, id: uuidv4() };
    setAds(prev => [...prev, newAd]);
  }, []);

  const updateAd = useCallback((id: string, updates: Partial<Ad>) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, ...updates } : ad));
  }, []);

  const removeAd = useCallback((id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
  }, []);

  const toggleAd = useCallback((id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
  }, []);

  const getAdsByPlacement = useCallback((placement: Ad['placement']) => {
    return ads.filter(ad => ad.placement === placement && ad.active);
  }, [ads]);

  return { ads, addAd, updateAd, removeAd, toggleAd, getAdsByPlacement };
}
