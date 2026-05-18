import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import { useChat } from './hooks/useChat';
import { useAds } from './hooks/useAds';
import LoginScreen from './components/LoginScreen';
import ChatRoom from './components/ChatRoom';
import AdManager from './components/AdManager';

const USER_KEY = 'chatroom_current_user';

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredUser);
  const [showAdManager, setShowAdManager] = useState(false);
  const { messages, onlineUsers, sendMessage } = useChat(currentUser);
  const { ads, addAd, updateAd, removeAd, toggleAd, getAdsByPlacement } = useAds();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [currentUser]);

  const handleLogin = useCallback((username: string, avatarColor: string) => {
    const user: User = {
      id: uuidv4(),
      username,
      avatarColor,
      lastSeen: Date.now(),
    };
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
      <ChatRoom
        user={currentUser}
        messages={messages}
        onlineUsers={onlineUsers}
        onSend={sendMessage}
        bannerAds={getAdsByPlacement('banner')}
        sidebarAds={getAdsByPlacement('sidebar')}
        inlineAds={getAdsByPlacement('inline')}
        onOpenAdManager={() => setShowAdManager(true)}
        onLogout={handleLogout}
      />
      {showAdManager && (
        <AdManager
          ads={ads}
          onAdd={addAd}
          onUpdate={updateAd}
          onRemove={removeAd}
          onToggle={toggleAd}
          onClose={() => setShowAdManager(false)}
        />
      )}
    </>
  );
}
