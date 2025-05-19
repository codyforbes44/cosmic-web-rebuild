
import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { X, ThumbsUp, ThumbsDown, Share2, Settings } from 'lucide-react';
import { ChatMessage } from './types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ZapierManager from './ZapierManager';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [showRating, setShowRating] = useState<string | null>(null);
  
  const handleQuickResponse = (response: string) => {
    onMessageChange(response);
    onSendMessage();
  };
  
  const handleFeedback = (messageId: string, type: 'positive' | 'negative') => {
    setShowRating(messageId);
    // Here you could send the feedback to your analytics system
    toast({
      title: "Thank you for your feedback!",
      description: type === 'positive' 
        ? "We're glad our response was helpful." 
        : "We'll work on improving our responses.",
      duration: 3000,
    });
  };
  
  const handleShare = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "You can now paste this information anywhere.",
          duration: 2000,
        });
      })
      .catch(err => {
        toast({
          title: "Could not copy text",
          description: "Please try selecting and copying manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-brand-gold to-brand-gold/80 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3 ring-2 ring-white/30 border-2 border-white/20">
              <AvatarImage src="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png" alt="3BI Logo" />
            </Avatar>
            <div>
              <h3 className="text-white font-bold text-lg">ƷBI Assistant</h3>
              <p className="text-xs text-white/80">AI powered support</p>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={onToggleZapierManager} 
              className="text-white hover:bg-white/10 p-2 rounded-full transition-colors mr-1"
              aria-label="Zapier settings"
              title="Manage Zapier integrations"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={onToggleChat} 
              className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
          isThinking={isThinking} 
          chatContainerRef={chatContainerRef} 
        />
        
        {/* Quick responses - show only at the beginning */}
        {messages.length <= 1 && !isTyping && !isThinking && (
          <div className="p-2 bg-slate-50 dark:bg-slate-900 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800">
            {QUICK_RESPONSES.map((response, index) => (
              <button
                key={index}
                onClick={() => handleQuickResponse(response)}
                className="text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full 
                        bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
                        hover:bg-brand-gold hover:text-white hover:border-brand-gold 
                        transition-colors duration-200"
              >
                {response}
              </button>
            ))}
          </div>
        )}

        {/* Message actions - for bot messages only */}
        {messages.length > 0 && messages.some(msg => msg.sender === 'bot') && (
          <div className="px-4 pt-1 pb-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => handleFeedback(messages[messages.length - 1].id, 'positive')}
                className="flex items-center text-xs px-2 py-1 text-slate-500 hover:text-brand-gold"
                disabled={showRating !== null}
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                <span>Helpful</span>
              </button>
              
              <button 
                onClick={() => handleFeedback(messages[messages.length - 1].id, 'negative')}
                className="flex items-center text-xs px-2 py-1 text-slate-500 hover:text-brand-gold"
                disabled={showRating !== null}
              >
                <ThumbsDown className="w-3 h-3 mr-1" />
                <span>Not helpful</span>
              </button>
              
              <button 
                onClick={() => handleShare(messages[messages.length - 1].text)}
                className="flex items-center text-xs px-2 py-1 text-slate-500 hover:text-brand-gold"
              >
                <Share2 className="w-3 h-3 mr-1" />
                <span>Copy</span>
              </button>
            </div>
            
            {showRating && (
              <div className="text-center text-xs text-slate-500 mt-1 animate-fade-in">
                Thank you for your feedback!
              </div>
            )}
          </div>
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
