import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  useZephelSessionsQuery,
  useZephelMessagesQuery,
  useCreateZephelSessionMutation,
  useDeleteZephelSessionMutation,
  useAddZephelMessageMutation,
} from '@/lib/queries/hooks';

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

export const useZephelSessions = (userId?: string) => {
  const [currentSession, setCurrentSession] = useState<ZephelSession | null>(null);
  const [localMessages, setLocalMessages] = useState<ZephelMessage[]>([]);
  const { toast } = useToast();

  // Queries
  const {
    data: sessions = [],
    isLoading: isLoadingSessions,
    refetch: refetchSessions,
  } = useZephelSessionsQuery(userId);

  const {
    data: dbMessages = [],
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useZephelMessagesQuery(currentSession?.id);

  // Combine DB messages with local messages for sessionless usage
  const messages = currentSession ? dbMessages : localMessages;

  // Mutations
  const createSessionMutation = useCreateZephelSessionMutation(userId);
  const deleteSessionMutation = useDeleteZephelSessionMutation(userId);
  const addMessageMutation = useAddZephelMessageMutation();

  // Set messages (for local state when no session)
  const setMessages = useCallback((updater: ZephelMessage[] | ((prev: ZephelMessage[]) => ZephelMessage[])) => {
    if (typeof updater === 'function') {
      setLocalMessages(updater);
    } else {
      setLocalMessages(updater);
    }
  }, []);
  // Create a new session
  const createSession = useCallback(async (name: string = 'New Session') => {
    try {
      const newSession = await createSessionMutation.mutateAsync(name);
      setCurrentSession(newSession);
      return newSession;
    } catch {
      return null;
    }
  }, [createSessionMutation]);

  // Save a message to the current session
  const saveMessage = useCallback(async (
    role: 'user' | 'assistant',
    content: string,
    metadata: any = {}
  ) => {
    if (!currentSession) return null;

    try {
      const newMessage = await addMessageMutation.mutateAsync({
        session_id: currentSession.id,
        role,
        content,
        metadata,
      });
      return newMessage;
    } catch {
      return null;
    }
  }, [currentSession, addMessageMutation]);

  // Delete a session
  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      await deleteSessionMutation.mutateAsync(sessionId);
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
      }
    } catch {
      // Error handled by mutation
    }
  }, [deleteSessionMutation, currentSession]);

  // Switch to a different session
  const switchSession = useCallback((session: ZephelSession) => {
    setCurrentSession(session);
  }, []);

  // Export session as JSON
  const exportSession = useCallback((session: ZephelSession) => {
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
  }, [messages, toast]);

  return {
    // Data
    sessions: sessions as ZephelSession[],
    currentSession,
    messages: messages as ZephelMessage[],
    
    // Loading states
    isLoading: isLoadingSessions || isLoadingMessages,
    isLoadingSessions,
    isLoadingMessages,
    isCreating: createSessionMutation.isPending,
    isDeleting: deleteSessionMutation.isPending,
    isSavingMessage: addMessageMutation.isPending,
    
    // Actions
    loadSessions: refetchSessions,
    loadMessages: refetchMessages,
    createSession,
    saveMessage,
    deleteSession,
    switchSession,
    exportSession,
    setCurrentSession,
    setMessages,
  };
};
