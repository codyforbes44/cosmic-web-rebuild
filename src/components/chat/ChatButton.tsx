
import { useState, useEffect } from 'react';
import { X, MessageCircle, Headset, Bot, BrainCircuit, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSetting } from '@/types/settings';

interface ChatButtonProps {
  isOpen: boolean;
  unreadCount: number;
  toggle: () => void;
}

export default function ChatButton({ isOpen, unreadCount, toggle }: ChatButtonProps) {
  const [iconType, setIconType] = useState<string>('text');

  // Fetch the current icon setting from the database
  useEffect(() => {
    const fetchIconSetting = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'chatbot_icon')
          .single();
        
        if (error) {
          console.error('Error fetching chatbot icon setting:', error);
          return;
        }
        
        if (data) {
          setIconType(data.value);
        }
      } catch (err) {
        console.error('Error in fetching chatbot icon setting:', err);
      }
    };

    fetchIconSetting();
  }, []);

  // Render the appropriate icon based on the setting
  const renderChatIcon = () => {
    switch (iconType) {
      case 'message-circle':
        return <MessageCircle className="h-8 w-8" />;
      case 'headset':
        return <Headset className="h-8 w-8" />;
      case 'bot':
        return <Bot className="h-8 w-8" />;
      case 'brain':
        return <BrainCircuit className="h-8 w-8" />;
      case 'message-square':
        return <MessageSquare className="h-8 w-8" />;
      case 'text':
      default:
        return (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent to-accent/70">
            <div className="font-bold text-xl">ƷBI</div>
          </div>
        );
    }
  };

  return (
    <button
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 pulse-animation overflow-hidden border-2 border-white"
      onClick={toggle}
    >
      {isOpen ? (
        <X className="h-8 w-8" />
      ) : (
        <>
          {renderChatIcon()}
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </div>
          )}
        </>
      )}
    </button>
  );
}
