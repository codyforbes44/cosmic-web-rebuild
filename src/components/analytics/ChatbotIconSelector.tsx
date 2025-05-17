
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Headset, Bot, BrainCircuit, MessageSquare } from 'lucide-react';

// Define the available icon options
const iconOptions = [
  { id: 'text', label: 'Text (ƷBI)', component: () => <span className="font-bold text-xl">ƷBI</span> },
  { id: 'message-circle', label: 'Message Circle', component: () => <MessageCircle className="h-6 w-6" /> },
  { id: 'headset', label: 'Headset', component: () => <Headset className="h-6 w-6" /> },
  { id: 'bot', label: 'Bot', component: () => <Bot className="h-6 w-6" /> },
  { id: 'brain', label: 'AI Brain', component: () => <BrainCircuit className="h-6 w-6" /> },
  { id: 'message-square', label: 'Message Square', component: () => <MessageSquare className="h-6 w-6" /> },
];

interface ChatbotIconSelectorProps {
  refetchAnalytics: () => Promise<void>;
}

const ChatbotIconSelector: React.FC<ChatbotIconSelectorProps> = ({ refetchAnalytics }) => {
  const [selectedIcon, setSelectedIcon] = useState<string>('text'); // Default to text icon
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch current icon setting when component mounts
  React.useEffect(() => {
    const fetchCurrentIcon = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'chatbot_icon')
          .single();
        
        if (error) {
          console.error('Error fetching current chatbot icon:', error);
          return;
        }
        
        if (data) {
          setSelectedIcon(data.value);
        }
      } catch (err) {
        console.error('Error in fetching chatbot icon setting:', err);
      }
    };

    fetchCurrentIcon();
  }, []);

  const saveIconSetting = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          { key: 'chatbot_icon', value: selectedIcon },
          { onConflict: 'key' }
        );
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Chatbot icon updated",
        description: "The chatbot icon has been successfully updated.",
      });
      
      // Refetch analytics data to ensure any UI that depends on it is updated
      await refetchAnalytics();
      
    } catch (err: any) {
      console.error('Error saving chatbot icon setting:', err);
      toast({
        variant: "destructive",
        title: "Failed to update chatbot icon",
        description: err.message || "An unknown error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Preview the selected icon
  const IconPreview = iconOptions.find(icon => icon.id === selectedIcon)?.component || iconOptions[0].component;

  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Chatbot Icon Settings</CardTitle>
        <CardDescription className="text-gray-400">
          Choose which icon to display on the chat button
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-start sm:items-end">
          <div className="w-full sm:w-2/3">
            <label htmlFor="icon-selector" className="block text-sm font-medium mb-1">
              Select Icon
            </label>
            <Select
              value={selectedIcon}
              onValueChange={setSelectedIcon}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {iconOptions.map(icon => (
                  <SelectItem key={icon.id} value={icon.id} className="text-white hover:bg-gray-600">
                    <div className="flex items-center gap-2">
                      {icon.component()}
                      <span>{icon.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={saveIconSetting}
            className="px-4 py-2 bg-accent hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Icon Setting"}
          </Button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Icon Preview</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <IconPreview />
            </div>
            <div className="text-sm text-gray-400">
              This is how the chatbot icon will appear to your visitors
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotIconSelector;
