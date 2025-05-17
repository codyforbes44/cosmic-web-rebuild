
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import UserInfoForm from './UserInfoForm';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { AUTO_RESPONSES, DEFAULT_RESPONSE, INITIAL_MESSAGE } from './constants';
import { Message, UserInfo } from './types';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', submitted: false });
  const [lastSeenId, setLastSeenId] = useState('1');

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const responseTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll on new messages
  useEffect(() => {
    if (isOpen && scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened and user info submitted
  useEffect(() => {
    if (isOpen && userInfo.submitted && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isOpen, userInfo.submitted]);

  // Clean up pending timeout on unmount
  useEffect(() => {
    return () => {
      if (responseTimeout.current) clearTimeout(responseTimeout.current);
    };
  }, []);

  // Compute unread count
  const unreadCount = messages.filter(m => m.id > lastSeenId && m.sender === 'agent').length;

  const toggleChat = useCallback(() => {
    setIsOpen(open => {
      if (!open) setLastSeenId(messages[messages.length - 1].id);
      return !open;
    });
    setIsMinimized(false);
  }, [messages]);

  const minimize = useCallback(() => setIsMinimized(true), []);
  const restore = useCallback(() => setIsMinimized(false), []);

  const handleUserInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(info => ({ ...info, [name]: value }));
  }, []);

  const submitUserInfo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo(info => ({ ...info, submitted: true }));
    const welcome: Message = { 
      id: uuidv4(), 
      sender: 'agent', 
      text: `Hi ${userInfo.name}! Thanks for providing your information. How can I assist you with your project today?`, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(msgs => [...msgs, welcome]);
  }, [userInfo.name]);

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

    responseTimeout.current = setTimeout(() => {
      const agentMsg: Message = { 
        id: uuidv4(), 
        sender: 'agent', 
        text: respText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(msgs => [...msgs, agentMsg]);
      setIsTyping(false);
    }, 1500);
  }, [newMessage]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatButton isOpen={isOpen} unreadCount={unreadCount} toggle={toggleChat} />

      {isOpen && (
        <div className={`bg-space-dark-blue rounded-lg shadow-xl overflow-hidden absolute bottom-20 right-0 w-80 md:w-96 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[80vh] max-h-[600px]'}`}>          
          <ChatHeader isTyping={isTyping} minimize={minimize} restore={restore} isMinimized={isMinimized} />

          {!isMinimized && (
            userInfo.submitted ? (
              <>
                <MessageList messages={messages} isTyping={isTyping} scrollAnchorRef={scrollAnchorRef} />
                <ChatInput newMessage={newMessage} onChange={e => setNewMessage(e.target.value)} onSubmit={sendMessage} inputRef={chatInputRef} />
              </>
            ) : (
              <UserInfoForm name={userInfo.name} email={userInfo.email} onChange={handleUserInfoChange} onSubmit={submitUserInfo} />
            )
          )}
        </div>
      )}
    </div>
  );
}
