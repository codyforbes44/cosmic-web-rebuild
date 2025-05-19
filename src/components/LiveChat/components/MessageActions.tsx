
import React from 'react';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(lastMessageText);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  const handleRating = (isPositive: boolean) => {
    // In a real app, you'd send this feedback to your backend
    toast({
      title: `Thank you for your ${isPositive ? 'positive' : 'negative'} feedback`,
      description: "We appreciate your input on our responses.",
      duration: 3000,
    });
    
    // Show the rating as selected
    setShowRating(lastMessageId);
  };

  return (
    <div className="message-actions px-4">
      {/* Copy button */}
      <button 
        onClick={handleCopyMessage}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        aria-label="Copy message"
        title="Copy message"
      >
        <Copy size={14} />
      </button>
      
      {/* Thumbs up button */}
      <button 
        onClick={() => handleRating(true)}
        className={`rating-button ${showRating === lastMessageId ? 'selected' : ''}`}
        aria-label="Rate helpful"
        title="This was helpful"
      >
        <ThumbsUp size={14} />
      </button>
      
      {/* Thumbs down button */}
      <button 
        onClick={() => handleRating(false)}
        className={`rating-button ${showRating === lastMessageId ? 'selected' : ''}`}
        aria-label="Rate unhelpful"
        title="This wasn't helpful"
      >
        <ThumbsDown size={14} />
      </button>
    </div>
  );
};

export default MessageActions;
