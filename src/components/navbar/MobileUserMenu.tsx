
import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileUserMenuProps {
  onClose: () => void;
}

const MobileUserMenu: React.FC<MobileUserMenuProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="px-3 py-4 border-b border-white/10 mb-4">
        <Link
          to="/auth"
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold/90 text-black rounded-md font-medium"
        >
          <User className="h-4 w-4" />
          Sign In
        </Link>
      </div>
    );
  }

  const getInitials = () => {
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="px-3 py-4 border-b border-white/10 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" alt={user.email || ''} />
          <AvatarFallback className="bg-brand-gold text-black font-medium">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user.email}
          </p>
          <p className="text-xs text-gray-400">
            Signed in
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md"
        >
          <User className="h-4 w-4" />
          Profile Settings
        </Link>
        
        <Link
          to="/weather"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md"
        >
          <Star className="h-4 w-4" />
          Favorite Locations
        </Link>
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-md w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default MobileUserMenu;
