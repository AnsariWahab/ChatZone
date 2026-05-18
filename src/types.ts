export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatarColor: string;
  text: string;
  timestamp: number;
  type: 'message' | 'system';
}

export interface User {
  id: string;
  username: string;
  avatarColor: string;
  lastSeen: number;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  icon: string;
  placement: 'banner' | 'sidebar' | 'inline';
  active: boolean;
}
