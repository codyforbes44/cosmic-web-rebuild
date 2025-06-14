import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ZephelSession {
  id: string;
  user_id: string;
  session_name: string;
  created_at: string;
  updated_at: string;
}

export interface ZephelMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata: any;
}

export const useZephelSessions = () => {
  const [sessions, setSessions] = useState<ZephelSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ZephelSession | null>(null);
  const [messages, setMessages] = useState<ZephelMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load all sessions for the user
  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('zephel_sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load sessions",
        variant: "destructive",
      });
    }
  };

  // Load messages for a specific session
  const loadMessages = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('zephel_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new session
  const createSession = async (name: string = 'New Session') => {
    try {
      const { data, error } = await supabase
        .from('zephel_sessions')
        .insert([{ session_name: name }])
        .select()
        .single();

      if (error) throw error;
      
      setSessions(prev => [data, ...prev]);
      setCurrentSession(data);
      setMessages([]);
      
      toast({
        title: "Session Created",
        description: `New session "${name}" created`,
      });
      
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive",
      });
      return null;
    }
  };

  // Save a message to the current session
  const saveMessage = async (role: 'user' | 'assistant', content: string, metadata: any = {}) => {
    if (!currentSession) return null;

    try {
      const { data, error } = await supabase
        .from('zephel_messages')
        .insert([{
          session_id: currentSession.id,
          role,
          content,
          metadata
        }])
        .select()
        .single();

      if (error) throw error;
      
      setMessages(prev => [...prev, data]);
      
      // Update session timestamp
      await supabase
        .from('zephel_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentSession.id);
      
      return data;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  };

  // Delete a session
  const deleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('zephel_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;
      
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
      
      toast({
        title: "Session Deleted",
        description: "Session has been deleted",
      });
    } catch (error) {
      console.error('Error deleting session:', error);
      toast({
        title: "Error",
        description: "Failed to delete session",
        variant: "destructive",
      });
    }
  };

  // Switch to a different session
  const switchSession = async (session: ZephelSession) => {
    setCurrentSession(session);
    await loadMessages(session.id);
  };

  // Export session as JSON
  const exportSession = (session: ZephelSession) => {
    const exportData = {
      session: session,
      messages: messages,
      exported_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zephel-session-${session.session_name.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Session Exported",
      description: "Session has been exported to JSON",
    });
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return {
    sessions,
    currentSession,
    messages,
    isLoading,
    loadSessions,
    loadMessages,
    createSession,
    saveMessage,
    deleteSession,
    switchSession,
    exportSession,
    setMessages
  };
};