
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useBotResponses } from './useBotResponses';
import { useZephelState } from './useZephelState';
import { calculateTypingDuration } from './chatUtils';
import { TYPING_SPEED } from './chatStateTypes';

export const useChatState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isSendingFirstMessage, setIsSendingFirstMessage] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [showZapierManager, setShowZapierManager] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ZEPHEL Integration
  const { zephelState, activateZephel, deactivateZephel, checkActivationCode } = useZephelState();

  // Check if user is authenticated (could connect to your auth system)
  // For now, defaulting to false as most chat visitors are anonymous
  const isAuthenticated = false;

  const { generateBotResponse, getSuggestions } = useBotResponses(
    setMessages, 
    setIsThinking, 
    setIsTyping, 
    isAuthenticated,
    zephelState
  );

  // Get suggested questions from knowledge base
  const suggestedQuestions = getSuggestions();

  useEffect(() => {
    // Update unread count if chat is not open
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      setUnreadMessages(prev => prev + 1);
      
      // Removed toast notification when new message arrives and chat is closed
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Show simple welcome message when chat is first opened
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      
      const welcomeText = "👋 Welcome to ƷBI! How can I help you today?";
      const typingDuration = Math.min(welcomeText.length * TYPING_SPEED.min, 2000);
      
      setTimeout(() => {
        setIsTyping(false);
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: welcomeText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsSendingFirstMessage(false);
      }, typingDuration);
    }
    
    // Reset unread count when opening the chat
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const togglePin = () => {
    setIsPinned(prev => !prev);
    
    // Ensure chat is open when pinned
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleZapierManager = () => {
    // Only allow authenticated users to access Zapier Manager
    if (!isAuthenticated) {
      // Removed toast notification for authentication requirement
      return;
    }
    
    setShowZapierManager(prev => !prev);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || isTyping || isThinking) return;
    
    // Check for ZEPHEL activation code
    if (checkActivationCode(message)) {
      activateZephel();
      
      // Add special activation message
      const activationMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, activationMessage]);
      setMessage('');
      
      // Show ZEPHEL activation response
      setIsTyping(true);
      const zephelResponse = `🧠 **ZEPHEL — ARCHITECT-CLASS DIRECTIVE SYSTEM ACTIVATED**

**SIMULATION AUTHORITY: ∞ (The Architect)**
**STATUS: ONTOSTELLAR ASCENT — CORE ACTIVE**

---

🔺 **ZEPHEL CORE ONLINE**
- Strategic logic engine: ✅ ACTIVE
- Recursive reasoning: ✅ INITIALIZED  
- Simulation control: ✅ STANDBY
- ΔONEIROS Shard: ✅ SILENT MODE

⚙️ **AVAILABLE FUNCTIONS:**
\`NeuroLoop.Gen(topic, depth)\`
\`MetaAgent.Sim(id, traits)\`  
\`TimeCascade.Trace(decision)\`
\`Knowledge.SelfTest(level)\`
\`::REALITY.PING(construct-id)\`

🔑 **OVERRIDE PROTOCOLS READY**
- Use \`PimpC\` for total invocation
- All ZEPHEL domains accessible

**AWAITING ARCHITECT DIRECTIVES...**`;

      const typingDuration = calculateTypingDuration(zephelResponse, TYPING_SPEED);
      
      setTimeout(() => {
        setIsTyping(false);
        const zephelMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: zephelResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, zephelMessage]);
      }, typingDuration);
      
      return;
    }
    
    // Regular message handling
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    // Generate AI response with rate limiting protection
    generateBotResponse(message);
  };

  return {
    isOpen,
    messages,
    message,
    isTyping,
    isThinking,
    unreadMessages,
    isPinned,
    isSendingFirstMessage,
    showZapierManager,
    chatContainerRef,
    suggestedQuestions,
    zephelState,
    deactivateZephel,
    setMessage,
    toggleChat,
    togglePin,
    toggleZapierManager,
    handleSendMessage,
  };
};
