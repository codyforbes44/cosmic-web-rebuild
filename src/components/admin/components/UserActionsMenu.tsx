
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Ban } from 'lucide-react';

export const UserActionsMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-700 focus:ring-2 focus:ring-accent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
        <DropdownMenuItem className="text-white hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground">
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground">
          Change Role
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-red-500 focus:text-white">
          <Ban className="h-4 w-4 mr-2" />
          Ban User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
