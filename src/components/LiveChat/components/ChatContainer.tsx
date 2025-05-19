
import React from 'react';
import { ChatMessage } from '../types';
import MessageList from '../MessageList';
import ChatInput from '../ChatInput';
import QuickResponses from './QuickResponses';
import MessageActions from './MessageActions';

interface ChatContainerProps {
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  isThinking: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  onQuickResponseSelect: (response: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  message,
  isTyping,
  isThinking,
  onMessageChange,
  onSendMessage,
  chatContainerRef,
  onQuickResponseSelect
}) => {
  // Logic to determine what to show
  const shouldShowQuickResponses = messages.length <= 1 && !isTyping && !isThinking;
  const shouldShowMessageActions = messages.length > 0 && messages.some(msg => msg.sender === 'bot');
  const lastBotMessage = messages.length > 0 ? 
    messages.filter(msg => msg.sender === 'bot').pop() : 
    null;
  
  const [showRating, setShowRating] = React.useState<string | null>(null);

  return (
    <>
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
          responses={["Tell me about your services", "What makes ƷBI different?", "How can I get started?"]}
          onSelectResponse={onQuickResponseSelect}
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
    </>
  );
};

export default ChatContainer;
