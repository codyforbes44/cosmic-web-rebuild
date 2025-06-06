import React from 'react';
import { MessageSquare, X } from 'lucide-react';
interface ChatToggleButtonProps {
  isOpen: boolean;
  unreadMessages: number;
  onToggle: () => void;
}
const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  isOpen,
  unreadMessages,
  onToggle
}) => {
  return;
};
export default ChatToggleButton;