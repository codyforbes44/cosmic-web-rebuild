import { useEffect, useState, useCallback } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Supabase client for realtime features
const supabaseUrl = 'https://strixttogzthapdhuczm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cml4dHRvZ3p0aGFwZGh1Y3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTkyNjIsImV4cCI6MjA2MzE3NTI2Mn0.bhSZ6QY907hrVEK9fPCKHVDYI-6BKgLmi36mMOVxTxs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface UserPresence {
  userId: string;
  username?: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  currentPage?: string;
  metadata?: Record<string, any>;
}

// Real-time notifications hook
export function useRealtimeNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    const notificationsChannel = supabase
      .channel(`notifications:${userId}`)
      .on('broadcast', { event: 'notification' }, (payload) => {
        console.log('New notification received:', payload);
        const notification: NotificationData = {
          id: payload.payload.id || Date.now().toString(),
          type: payload.payload.type || 'info',
          title: payload.payload.title,
          message: payload.payload.message,
          timestamp: new Date(payload.payload.timestamp || Date.now()),
          read: false,
          userId: payload.payload.userId,
          metadata: payload.payload.metadata
        };

        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico',
            tag: notification.id
          });
        }
      })
      .subscribe();

    setChannel(notificationsChannel);

    return () => {
      if (notificationsChannel) {
        supabase.removeChannel(notificationsChannel);
      }
    };
  }, [userId]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  }, []);

  const sendNotification = useCallback(async (notification: Omit<NotificationData, 'id' | 'timestamp' | 'read'>) => {
    if (!channel) return;

    const payload = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };

    await channel.send({
      type: 'broadcast',
      event: 'notification',
      payload
    });
  }, [channel]);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    sendNotification,
    requestNotificationPermission
  };
}

// Real-time user presence hook
export function useUserPresence(userId?: string, username?: string) {
  const [presenceData, setPresenceData] = useState<Map<string, UserPresence>>(new Map());
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    const presenceChannel = supabase
      .channel('global_presence')
      .on('presence', { event: 'sync' }, () => {
        console.log('Presence sync event');
        const newState = presenceChannel.presenceState();
        const usersMap = new Map<string, UserPresence>();
        
        Object.entries(newState).forEach(([key, presences]) => {
          if (presences && presences.length > 0) {
            const presence = presences[0] as any;
            usersMap.set(key, {
              userId: key,
              username: presence.username || key,
              avatar: presence.avatar,
              status: presence.status || 'online',
              lastSeen: new Date(presence.lastSeen || Date.now()),
              currentPage: presence.currentPage,
              metadata: presence.metadata
            });
          }
        });

        setPresenceData(usersMap);
        setOnlineUsers(Array.from(usersMap.values()).filter(user => user.status === 'online'));
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const userStatus = {
            userId,
            username: username || userId,
            status: 'online',
            lastSeen: new Date().toISOString(),
            currentPage: window.location.pathname,
            joinedAt: new Date().toISOString()
          };

          await presenceChannel.track(userStatus);
        }
      });

    setChannel(presenceChannel);

    // Update presence on page visibility changes
    const handleVisibilityChange = async () => {
      if (presenceChannel && document.visibilityState === 'visible') {
        await presenceChannel.track({
          userId,
          username: username || userId,
          status: 'online',
          lastSeen: new Date().toISOString(),
          currentPage: window.location.pathname
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Update current page on route changes
    const handleRouteChange = async () => {
      if (presenceChannel) {
        await presenceChannel.track({
          userId,
          username: username || userId,
          status: 'online',
          lastSeen: new Date().toISOString(),
          currentPage: window.location.pathname
        });
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handleRouteChange);
      
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [userId, username]);

  const updateStatus = useCallback(async (status: UserPresence['status']) => {
    if (!channel || !userId) return;

    await channel.track({
      userId,
      username: username || userId,
      status,
      lastSeen: new Date().toISOString(),
      currentPage: window.location.pathname
    });
  }, [channel, userId, username]);

  const updateMetadata = useCallback(async (metadata: Record<string, any>) => {
    if (!channel || !userId) return;

    await channel.track({
      userId,
      username: username || userId,
      status: 'online',
      lastSeen: new Date().toISOString(),
      currentPage: window.location.pathname,
      metadata
    });
  }, [channel, userId, username]);

  return {
    presenceData,
    onlineUsers,
    onlineCount: onlineUsers.length,
    updateStatus,
    updateMetadata
  };
}

// Real-time analytics hook
export function useRealtimeAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<Record<string, any>>({});
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const analyticsChannel = supabase
      .channel('analytics_updates')
      .on('broadcast', { event: 'analytics_update' }, (payload) => {
        console.log('Analytics update received:', payload);
        setAnalyticsData(prev => ({
          ...prev,
          [payload.payload.metric]: payload.payload.value,
          lastUpdated: new Date()
        }));
      })
      .subscribe();

    setChannel(analyticsChannel);

    return () => {
      if (analyticsChannel) {
        supabase.removeChannel(analyticsChannel);
      }
    };
  }, []);

  const trackEvent = useCallback(async (event: string, properties: Record<string, any> = {}) => {
    if (!channel) return;

    const eventData = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }
    };

    await channel.send({
      type: 'broadcast',
      event: 'track_event',
      payload: eventData
    });

    console.log('Event tracked:', eventData);
  }, [channel]);

  const updateMetric = useCallback(async (metric: string, value: any) => {
    if (!channel) return;

    await channel.send({
      type: 'broadcast',
      event: 'analytics_update',
      payload: { metric, value, timestamp: new Date().toISOString() }
    });
  }, [channel]);

  return {
    analyticsData,
    trackEvent,
    updateMetric
  };
}