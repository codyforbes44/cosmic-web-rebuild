
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { X } from 'lucide-react';
import { ChatMessage } from './types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onToggleChat: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  isTyping,
  onMessageChange,
  onSendMessage,
  onToggleChat,
  chatContainerRef
}) => {
  return (
    <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-brand-gold to-brand-gold/80 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-3 ring-2 ring-white/30 border-2 border-white/20">
            <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
          </Avatar>
          <div>
            <h3 className="text-white font-bold text-lg">ƷBI Assistant</h3>
            <p className="text-xs text-white/80">AI powered support</p>
          </div>
        </div>
        <button 
          onClick={onToggleChat} 
          className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        chatContainerRef={chatContainerRef} 
      />

      {/* Chat Input */}
      <ChatInput 
        message={message}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
