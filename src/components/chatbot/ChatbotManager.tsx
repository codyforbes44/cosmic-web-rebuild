
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Bot, Plus, Copy, Settings, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ChatbotInstance {
  id: string;
  name: string;
  description: string;
  configuration: any;
  is_active: boolean;
  created_at: string;
}

export const ChatbotManager: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newChatbot, setNewChatbot] = useState({ name: '', description: '' });
  const queryClient = useQueryClient();

  const { data: chatbots, isLoading } = useQuery({
    queryKey: ['chatbot-instances'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_instances')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ChatbotInstance[];
    },
  });

  const createChatbot = useMutation({
    mutationFn: async (chatbot: { name: string; description: string }) => {
      const { data, error } = await supabase
        .from('chatbot_instances')
        .insert([{
          name: chatbot.name,
          description: chatbot.description,
          configuration: { theme: 'default', welcomeMessage: 'Hello! How can I help you today?' }
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-instances'] });
      setIsCreateOpen(false);
      setNewChatbot({ name: '', description: '' });
      toast.success('Chatbot created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create chatbot: ' + error.message);
    }
  });

  const deleteChatbot = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('chatbot_instances')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-instances'] });
      toast.success('Chatbot deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete chatbot: ' + error.message);
    }
  });

  const generateEmbedCode = (chatbotId: string) => {
    return `<script src="https://your-domain.com/chatbot-embed.js" data-chatbot-id="${chatbotId}"></script>`;
  };

  const copyEmbedCode = (chatbotId: string) => {
    const embedCode = generateEmbedCode(chatbotId);
    navigator.clipboard.writeText(embedCode);
    toast.success('Embed code copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Chatbot Manager</h2>
          <p className="text-gray-400">Create and manage your AI chatbot instances</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/80">
              <Plus className="h-4 w-4 mr-2" />
              Create Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-space-deep-blue border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Chatbot</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new AI chatbot instance for your website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Chatbot Name</Label>
                <Input
                  id="name"
                  value={newChatbot.name}
                  onChange={(e) => setNewChatbot({ ...newChatbot, name: e.target.value })}
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Customer Support Bot"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={newChatbot.description}
                  onChange={(e) => setNewChatbot({ ...newChatbot, description: e.target.value })}
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Helps customers with common questions and support issues"
                />
              </div>
              <Button 
                onClick={() => createChatbot.mutate(newChatbot)}
                disabled={!newChatbot.name || createChatbot.isPending}
                className="w-full bg-accent hover:bg-accent/80"
              >
                {createChatbot.isPending ? 'Creating...' : 'Create Chatbot'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatbots?.map((chatbot) => (
          <Card key={chatbot.id} className="bg-space-deep-blue border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-accent" />
                  <CardTitle className="text-white text-lg">{chatbot.name}</CardTitle>
                </div>
                <Badge className={chatbot.is_active 
                  ? "bg-green-500/20 text-green-400 border-green-500/50" 
                  : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                }>
                  {chatbot.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                {chatbot.description || 'No description provided'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyEmbedCode(chatbot.id)}
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Embed Code
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Settings className="h-3 w-3 mr-2" />
                    Configure
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteChatbot.mutate(chatbot.id)}
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!chatbots || chatbots.length === 0) && (
        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No chatbots created yet</h3>
            <p className="text-gray-400 mb-6">Create your first AI chatbot to get started</p>
            <Button 
              onClick={() => setIsCreateOpen(true)}
              className="bg-accent hover:bg-accent/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Chatbot
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
