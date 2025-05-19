
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Settings, X } from 'lucide-react';

interface ChatHeaderProps {
  onToggleChat: () => void;
  onToggleZapierManager: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleChat,
  onToggleZapierManager
}) => {
  return (
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
  );
};

export default ChatHeader;
