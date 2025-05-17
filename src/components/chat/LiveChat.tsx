
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { AUTO_RESPONSES, DEFAULT_RESPONSE, INITIAL_MESSAGE } from './constants';
import { Message } from './types';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastSeenId, setLastSeenId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const responseTimeout = useRef<NodeJS.Timeout | null>(null);

  // Generate a session ID when component mounts
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  // Send initial welcome message with typing effect when chat opens
  useEffect(() => {
    if (isOpen && !initialMessageSent) {
      setIsTyping(true);
      
      // Delay the welcome message for a more natural feel
      setTimeout(() => {
        setMessages([INITIAL_MESSAGE]);
        setIsTyping(false);
        setInitialMessageSent(true);
        setLastSeenId(INITIAL_MESSAGE.id);
      }, 1200);
    }
  }, [isOpen, initialMessageSent]);

  // Scroll on new messages
  useEffect(() => {
    if (isOpen && scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && chatInputRef.current) {
      setTimeout(() => {
        if (chatInputRef.current) chatInputRef.current.focus();
      }, 500);
    }
  }, [isOpen]);

  // Clean up pending timeout on unmount
  useEffect(() => {
    return () => {
      if (responseTimeout.current) clearTimeout(responseTimeout.current);
    };
  }, []);

  // Welcome animation when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowWelcomeAnimation(true);
      const timer = setTimeout(() => {
        setShowWelcomeAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Compute unread count
  const unreadCount = messages.filter(m => m.id > lastSeenId && m.sender === 'agent').length;

  const toggleChat = useCallback(() => {
    setIsOpen(open => {
      if (!open) {
        if (messages.length > 0) {
          setLastSeenId(messages[messages.length - 1].id);
        }
      }
      return !open;
    });
    setIsMinimized(false);
  }, [messages]);

  const minimize = useCallback(() => setIsMinimized(true), []);
  const restore = useCallback(() => setIsMinimized(false), []);

  // Store chat interaction in Supabase
  const storeChatInteraction = async (message: string, response: string) => {
    try {
      await supabase.from('chat_interactions').insert({
        session_id: sessionId,
        user_name: null,
        user_email: null,
        message,
        response
      });
    } catch (error) {
      console.error('Error storing chat interaction:', error);
    }
  };

  const sendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;

    const userMsg: Message = { 
      id: uuidv4(), 
      sender: 'user', 
      text, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(msgs => [...msgs, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    // Auto-response match
    const match = AUTO_RESPONSES.find(({ keywords }) => {
      const re = new RegExp(`\\b(${keywords.join('|')})\\b`, 'i');
      return re.test(text);
    });
    const respText = match ? match.response : DEFAULT_RESPONSE;

    // Simulate a more natural typing delay based on response length
    const typingDelay = Math.min(1500, 500 + respText.length * 10);
    
    responseTimeout.current = setTimeout(() => {
      const agentMsg: Message = { 
        id: uuidv4(), 
        sender: 'agent', 
        text: respText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(msgs => [...msgs, agentMsg]);
      setIsTyping(false);
      
      // Store the interaction in Supabase
      storeChatInteraction(text, respText);
    }, typingDelay);
  }, [newMessage, sessionId]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatButton isOpen={isOpen} unreadCount={unreadCount} toggle={toggleChat} />

      {isOpen && (
        <div 
          className={`bg-space-dark-blue rounded-lg shadow-2xl overflow-hidden absolute bottom-20 right-0 w-80 md:w-96 transition-all duration-300 
            ${isMinimized ? 'h-14' : 'h-[80vh] max-h-[600px]'}
            ${showWelcomeAnimation ? 'animate-scale-in' : ''}`}
        >          
          <ChatHeader isTyping={isTyping} minimize={minimize} restore={restore} isMinimized={isMinimized} />

          {!isMinimized && (
            <>
              <MessageList messages={messages} isTyping={isTyping} scrollAnchorRef={scrollAnchorRef} />
              <ChatInput newMessage={newMessage} onChange={e => setNewMessage(e.target.value)} onSubmit={sendMessage} inputRef={chatInputRef} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

