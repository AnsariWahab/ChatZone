import { Ad } from '../types';

export const defaultAds: Ad[] = [
  {
    id: 'ansari-banner-1',
    title: '🪑 Ansari Interiors',
    description: 'Luxury Crafted for Modern Living — Premium furniture for your dream home',
    ctaText: 'Visit Store →',
    ctaLink: 'https://ansari-furniture.vercel.app/',
    bgGradient: 'from-amber-900 via-yellow-800 to-amber-700',
    icon: '🏠',
    placement: 'banner',
    active: true,
  },
  {
    id: 'ansari-banner-2',
    title: '✨ Ansari Interiors',
    description: 'Transform your space with handcrafted luxury furniture — Explore our collection!',
    ctaText: 'Shop Now →',
    ctaLink: 'https://ansari-furniture.vercel.app/',
    bgGradient: 'from-stone-800 via-amber-800 to-yellow-700',
    icon: '🛋️',
    placement: 'banner',
    active: true,
  },
  {
    id: 'ansari-sidebar-1',
    title: '🪑 Ansari Interiors',
    description: 'Luxury furniture crafted for modern living. Sofas, beds, dining sets & more!',
    ctaText: 'Explore Collection →',
    ctaLink: 'https://ansari-furniture.vercel.app/',
    bgGradient: 'from-stone-900 via-amber-900 to-stone-800',
    icon: '🏡',
    placement: 'sidebar',
    active: true,
  },
  {
    id: 'ansari-inline-1',
    title: '🛋️ Ansari Interiors — Luxury Furniture',
    description: 'Handcrafted elegance for every room. Visit us today!',
    ctaText: 'Shop →',
    ctaLink: 'https://ansari-furniture.vercel.app/',
    bgGradient: 'from-amber-800 via-yellow-700 to-amber-600',
    icon: '✨',
    placement: 'inline',
    active: true,
  },
];

// Version key to force refresh when ads change
export const ADS_VERSION = 'ansari-v2';
