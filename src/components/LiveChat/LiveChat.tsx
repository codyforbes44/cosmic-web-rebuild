
import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { MessageSquare, X, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { AUTO_RESPONSES, defaultResponse } from './chatResponses';
import './LiveChat.css';

// Chat Button
const ChatButton = ({ isOpen, unreadCount, toggle }) => {
  return (
    <button
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="chat-button w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors relative"
      onClick={toggle}
    >
      {isOpen ? (
        <X className="h-8 w-8" />
      ) : (
        <>
          <MessageSquare className="h-8 w-8" />
          {unreadCount > 0 && (
            <div className="unread-badge absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </div>
          )}
        </>
      )}
    </button>
  );
};

// Chat Header
const ChatHeader = ({ isTyping, minimize, restore, isMinimized }) => {
  return (
    <div className="chat-header bg-accent p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
          <span className="text-accent font-bold text-lg">Ʒ</span>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">Ʒʙɪ Support</h3>
          <div className="text-xs text-white/80" aria-live="polite">
            {isTyping ? 'Typing...' : 'Online'}
          </div>
        </div>
      </div>
      <div className="flex">
        {isMinimized ? (
          <button onClick={restore} aria-label="Restore chat" className="text-white hover:text-white/80 p-1">
            <ChevronUp className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={minimize} aria-label="Minimize chat" className="text-white hover:text-white/80 p-1">
            <ChevronDown className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// User Info Form
const UserInfoForm = ({ name, email, onChange, onSubmit }) => {
  return (
    <div className="user-info-form p-6 bg-space-dark-blue">
      <p className="text-white mb-4 text-center">Please provide your information to start the chat</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1 text-sm">Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full p-3 rounded-md bg-space-deep-blue border border-gray-700 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1 text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-3 rounded-md bg-space-deep-blue border border-gray-700 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button type="submit" className="w-full bg-accent text-white py-3 rounded-md hover:bg-accent/90 transition-colors font-medium shadow-md">
          Start Chat
        </button>
      </form>
    </div>
  );
};

// Message List
const MessageList = ({ messages, isTyping, scrollAnchorRef }) => {
  return (
    <div className="chat-messages p-4 overflow-y-auto h-[calc(100%-128px)] bg-space-dark-blue">
      {messages.map(msg => (
        <div key={msg.id} className={`message mb-4 ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}>
          <div className={`message-bubble p-3 rounded-lg max-w-[80%] ${
            msg.sender === 'user' ? 'bg-brand-blue text-white ml-auto' : 'bg-space-deep-blue text-white'
          }`}>{msg.text}</div>
          <div className={`message-time text-xs text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
        </div>
      ))}
      {isTyping && (
        <div className="typing-indicator flex space-x-1 p-3 bg-space-deep-blue rounded-lg w-16">
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
      <div ref={scrollAnchorRef} />
    </div>
  );
};

// Chat Input
const ChatInput = ({ newMessage, onChange, onSubmit, inputRef }) => {
  return (
    <form onSubmit={onSubmit} className="chat-input-container p-4 border-t border-gray-700 bg-space-deep-blue">
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow p-3 rounded-l-md bg-space-dark-blue border-y border-l border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Type your message..."
          value={newMessage}
          onChange={onChange}
        />
        <button type="submit" className="bg-accent text-white p-3 rounded-r-md hover:bg-accent/90 transition-colors" aria-label="Send message">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

// Main LiveChat Component
const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', sender: 'agent', text: 'Hello! Welcome to Ʒʙɪ. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', submitted: false });
  const [lastSeenId, setLastSeenId] = useState('1');

  const scrollAnchorRef = useRef(null);
  const chatInputRef = useRef(null);
  const responseTimeout = useRef(null);

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
    return () => clearTimeout(responseTimeout.current);
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

  const handleUserInfoChange = useCallback(e => {
    const { name, value } = e.target;
    setUserInfo(info => ({ ...info, [name]: value }));
  }, []);

  const submitUserInfo = useCallback(e => {
    e.preventDefault();
    setUserInfo(info => ({ ...info, submitted: true }));
    const welcome = { id: nanoid(), sender: 'agent', text: `Hi ${userInfo.name}! Thanks for providing your information. How can I assist you with your project today?`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(msgs => [...msgs, welcome]);
  }, [userInfo.name]);

  const sendMessage = useCallback(e => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;

    const userMsg = { id: nanoid(), sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(msgs => [...msgs, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    // Auto-response match
    const match = AUTO_RESPONSES.find(({ keywords }) => {
      const re = new RegExp(`\\b(${keywords.join('|')})\\b`, 'i');
      return re.test(text);
    });
    const respText = match ? match.response : defaultResponse;

    responseTimeout.current = setTimeout(() => {
      const agentMsg = { id: nanoid(), sender: 'agent', text: respText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(msgs => [...msgs, agentMsg]);
      setIsTyping(false);
    }, 1500);
  }, [newMessage]);

  return (
    <div className="live-chat-container fixed bottom-6 right-6 z-50">
      <ChatButton isOpen={isOpen} unreadCount={unreadCount} toggle={toggleChat} />

      {isOpen && (
        <div 
          className={`chat-window glass-effect bg-space-deep-blue/95 rounded-xl shadow-2xl overflow-hidden absolute bottom-20 right-0 w-80 md:w-96 transition-all duration-300 border border-white/10 ${isMinimized ? 'h-14' : 'h-[80vh] max-h-[600px]'}`}
        >          
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
};

export default LiveChat;
