
import React, { useRef } from 'react';
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
      <div className="bg-space-cadet p-4 flex justify-between items-center dark:bg-slate-800">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
          </Avatar>
          <div>
            <h3 className="text-white font-bold">ƷBI Assistant</h3>
            <p className="text-xs text-slate-300">AI powered support</p>
          </div>
        </div>
        <button 
          onClick={onToggleChat} 
          className="text-white hover:bg-slate-700 p-1 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
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
