import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, User } from '../types';

const MESSAGES_KEY = 'chatroom_messages';
const USERS_KEY = 'chatroom_users';
const MAX_MESSAGES = 200;

const botMessages = [
  "Hey everyone! 👋 Welcome to the chat!",
  "Anyone watching the game tonight? 🏀",
  "Just grabbed some coffee ☕ What's up?",
  "This chat room is so cool! Love the vibes ✨",
  "Has anyone tried that new restaurant downtown? 🍔",
  "Happy Friday everyone! 🎉",
  "Just finished a great workout 💪",
  "The weather is amazing today! ☀️",
  "Who's up for some gaming later? 🎮",
  "Just learned something new today! 📚",
  "Can't believe it's already this late 😅",
  "Pizza or tacos? Important question! 🤔",
  "Good morning from the other side of the world! 🌍",
  "Just found the best playlist ever 🎵",
  "Love this community! You all are awesome 💯",
];

const botUsers: User[] = [
  { id: 'bot-1', username: 'Alex_Gaming', avatarColor: '#ef4444', lastSeen: Date.now() },
  { id: 'bot-2', username: 'Sarah_Dev', avatarColor: '#8b5cf6', lastSeen: Date.now() },
  { id: 'bot-3', username: 'Mike_Music', avatarColor: '#06b6d4', lastSeen: Date.now() },
  { id: 'bot-4', username: 'Luna_Art', avatarColor: '#ec4899', lastSeen: Date.now() },
  { id: 'bot-5', username: 'Jake_Sports', avatarColor: '#f59e0b', lastSeen: Date.now() },
  { id: 'bot-6', username: 'Emma_Reads', avatarColor: '#10b981', lastSeen: Date.now() },
];

function getStoredMessages(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeMessages(messages: ChatMessage[]) {
  const trimmed = messages.slice(-MAX_MESSAGES);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(trimmed));
}

function getStoredUsers(): User[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useChat(currentUser: User | null) {
  const [messages, setMessages] = useState<ChatMessage[]>(getStoredMessages);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const botIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize BroadcastChannel for cross-tab sync
  useEffect(() => {
    try {
      channelRef.current = new BroadcastChannel('chatroom_channel');
      channelRef.current.onmessage = (event) => {
        if (event.data.type === 'new_message') {
          setMessages(prev => {
            const updated = [...prev, event.data.message].slice(-MAX_MESSAGES);
            return updated;
          });
        }
        if (event.data.type === 'user_update') {
          setOnlineUsers(getStoredUsers());
        }
      };
    } catch {
      // BroadcastChannel not supported
    }

    return () => {
      channelRef.current?.close();
    };
  }, []);

  // Register current user and heartbeat
  useEffect(() => {
    if (!currentUser) return;

    const updatePresence = () => {
      const users = getStoredUsers();
      const now = Date.now();
      // Remove stale users (not seen for 30s)
      const active = users.filter(u => now - u.lastSeen < 30000 && u.id !== currentUser.id);
      active.push({ ...currentUser, lastSeen: now });
      // Add some bots
      const activeBots = botUsers.slice(0, 3 + Math.floor(Math.random() * 3)).map(b => ({
        ...b,
        lastSeen: now - Math.floor(Math.random() * 10000),
      }));
      const allUsers = [...active, ...activeBots];
      storeUsers(allUsers);
      setOnlineUsers(allUsers);
      channelRef.current?.postMessage({ type: 'user_update' });
    };

    updatePresence();
    const interval = setInterval(updatePresence, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Seed initial messages if empty
  useEffect(() => {
    if (messages.length === 0) {
      const seedMessages: ChatMessage[] = [];
      const now = Date.now();
      for (let i = 0; i < 8; i++) {
        const bot = botUsers[Math.floor(Math.random() * botUsers.length)];
        const msg = botMessages[Math.floor(Math.random() * botMessages.length)];
        seedMessages.push({
          id: uuidv4(),
          userId: bot.id,
          username: bot.username,
          avatarColor: bot.avatarColor,
          text: msg,
          timestamp: now - (8 - i) * 60000 * Math.random() * 5,
          type: 'message',
        });
      }
      setMessages(seedMessages);
      storeMessages(seedMessages);
    }
  }, []);

  // Bot auto-messages
  useEffect(() => {
    if (!currentUser) return;

    botIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.4) return; // 60% chance to skip
      const bot = botUsers[Math.floor(Math.random() * botUsers.length)];
      const text = botMessages[Math.floor(Math.random() * botMessages.length)];
      const newMsg: ChatMessage = {
        id: uuidv4(),
        userId: bot.id,
        username: bot.username,
        avatarColor: bot.avatarColor,
        text,
        timestamp: Date.now(),
        type: 'message',
      };
      setMessages(prev => {
        const updated = [...prev, newMsg].slice(-MAX_MESSAGES);
        storeMessages(updated);
        return updated;
      });
    }, 8000 + Math.random() * 12000);

    return () => {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    };
  }, [currentUser]);

  const sendMessage = useCallback((text: string) => {
    if (!currentUser || !text.trim()) return;

    const newMsg: ChatMessage = {
      id: uuidv4(),
      userId: currentUser.id,
      username: currentUser.username,
      avatarColor: currentUser.avatarColor,
      text: text.trim(),
      timestamp: Date.now(),
      type: 'message',
    };

    setMessages(prev => {
      const updated = [...prev, newMsg].slice(-MAX_MESSAGES);
      storeMessages(updated);
      return updated;
    });

    channelRef.current?.postMessage({ type: 'new_message', message: newMsg });
  }, [currentUser]);

  const clearChat = useCallback(() => {
    setMessages([]);
    storeMessages([]);
  }, []);

  return { messages, onlineUsers, sendMessage, clearChat };
}
