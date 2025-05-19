
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

interface MessageActionsProps {
  lastMessageId: string;
  lastMessageText: string;
  showRating: string | null;
  setShowRating: (id: string | null) => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  lastMessageId,
  lastMessageText,
  showRating,
  setShowRating
}) => {
  const { toast } = useToast();

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
    <div className="px-4 pt-1 pb-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => handleFeedback(lastMessageId, 'positive')}
          className="flex items-center text-xs px-2 py-1 text-slate-500 hover:text-brand-gold"
          disabled={showRating !== null}
        >
          <ThumbsUp className="w-3 h-3 mr-1" />
          <span>Helpful</span>
        </button>
        
        <button 
          onClick={() => handleFeedback(lastMessageId, 'negative')}
          className="flex items-center text-xs px-2 py-1 text-slate-500 hover:text-brand-gold"
          disabled={showRating !== null}
        >
          <ThumbsDown className="w-3 h-3 mr-1" />
          <span>Not helpful</span>
        </button>
        
        <button 
          onClick={() => handleShare(lastMessageText)}
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
  );
};

export default MessageActions;
