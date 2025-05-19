
import React, { useState } from 'react';
import { ChatMessage } from './types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ZapierManager from './ZapierManager';
import ChatHeader from './components/ChatHeader';
import QuickResponses from './components/QuickResponses';
import MessageActions from './components/MessageActions';

interface ChatWindowProps {
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  isThinking?: boolean;
  showZapierManager?: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onToggleChat: () => void;
  onToggleZapierManager?: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const QUICK_RESPONSES = [
  "Tell me about your services",
  "What makes ƷBI different?",
  "How can I get started?",
  "Zapier help"
];

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  isTyping,
  isThinking = false,
  showZapierManager = false,
  onMessageChange,
  onSendMessage,
  onToggleChat,
  onToggleZapierManager = () => {},
  chatContainerRef
}) => {
  const [showRating, setShowRating] = useState<string | null>(null);
  
  const handleQuickResponse = (response: string) => {
    onMessageChange(response);
    onSendMessage();
  };
  
  const shouldShowQuickResponses = messages.length <= 1 && !isTyping && !isThinking;
  const shouldShowMessageActions = messages.length > 0 && messages.some(msg => msg.sender === 'bot');
  const lastBotMessage = messages.length > 0 ? 
    messages.filter(msg => msg.sender === 'bot').pop() : 
    null;

  return (
    <>
      <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700">
        {/* Chat Header */}
        <ChatHeader 
          onToggleChat={onToggleChat}
          onToggleZapierManager={onToggleZapierManager}
        />

        {/* Chat Messages */}
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
          isThinking={isThinking} 
          chatContainerRef={chatContainerRef} 
        />
        
        {/* Quick responses - show only at the beginning */}
        {shouldShowQuickResponses && (
          <QuickResponses 
            responses={QUICK_RESPONSES}
            onSelectResponse={handleQuickResponse}
          />
        )}

        {/* Message actions - for bot messages only */}
        {shouldShowMessageActions && lastBotMessage && (
          <MessageActions 
            lastMessageId={lastBotMessage.id} 
            lastMessageText={lastBotMessage.text}
            showRating={showRating}
            setShowRating={setShowRating}
          />
        )}

        {/* Chat Input */}
        <ChatInput 
          message={message}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
          isDisabled={isTyping || isThinking}
        />
      </div>
      
      {/* Zapier Manager */}
      {showZapierManager && (
        <ZapierManager
          isOpen={showZapierManager}
          onClose={onToggleZapierManager}
        />
      )}
    </>
  );
};

export default ChatWindow;
