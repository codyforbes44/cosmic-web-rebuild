
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getStoredWebhooks, saveWebhook, removeWebhook, ZapierWebhook } from './zapierIntegration';
import { Trash2, Plus, Link } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ZapierManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZapierManager: React.FC<ZapierManagerProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>([]);
  const [newWebhook, setNewWebhook] = useState<ZapierWebhook>({
    id: uuidv4(),
    name: '',
    url: '',
    description: '',
    category: ''
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Load webhooks when component mounts
  useEffect(() => {
    setWebhooks(getStoredWebhooks());
  }, []);

  const handleAddNew = () => {
    setIsAdding(true);
    setNewWebhook({
      id: uuidv4(),
      name: '',
      url: '',
      description: '',
      category: ''
    });
  };

  const handleSave = () => {
    // Validate fields
    if (!newWebhook.name || !newWebhook.url || !newWebhook.category) {
      toast({
        title: "Missing Required Fields",
        description: "Name, URL, and Category are required.",
        variant: "destructive",
      });
      return;
    }

    // Save webhook
    saveWebhook(newWebhook);
    
    // Update state
    setWebhooks(getStoredWebhooks());
    setIsAdding(false);
    
    toast({
      title: "Webhook Saved",
      description: `${newWebhook.name} has been added to your Zapier integrations.`,
    });
  };

  const handleDelete = (id: string) => {
    removeWebhook(id);
    setWebhooks(getStoredWebhooks());
    
    toast({
      title: "Webhook Removed",
      description: "The Zapier integration has been removed.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWebhook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Zapier Integrations</DialogTitle>
          <DialogDescription>
            Connect ƷBI's chatbot with your Zapier workflows. Trigger actions by sending commands like "zap [category] with [details]".
          </DialogDescription>
        </DialogHeader>
        
        {isAdding ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Integration Name</Label>
              <Input 
                id="name"
                name="name"
                value={newWebhook.name}
                onChange={handleChange}
                placeholder="Customer Support Ticket"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Trigger Category</Label>
              <Input 
                id="category"
                name="category"
                value={newWebhook.category}
                onChange={handleChange}
                placeholder="support"
                className="lowercase"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is the word used to trigger this integration (e.g., "zap support with issue: printer not working").
              </p>
            </div>
            
            <div>
              <Label htmlFor="url">Webhook URL</Label>
              <Input 
                id="url"
                name="url"
                value={newWebhook.url}
                onChange={handleChange}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={newWebhook.description}
                onChange={handleChange}
                placeholder="Create a support ticket in our helpdesk when triggered"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Integration</Button>
            </div>
          </div>
        ) : (
          <>
            {webhooks.length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {webhooks.map(webhook => (
                  <div key={webhook.id} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg relative group">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{webhook.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Trigger: "zap <span className="font-mono">{webhook.category}</span>"
                        </p>
                        {webhook.description && (
                          <p className="text-sm mt-1">{webhook.description}</p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Link className="h-3 w-3 mr-1" />
                      {webhook.url.substring(0, 30)}...
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No Zapier integrations configured yet.</p>
                <p className="text-sm text-gray-400 mt-1">Add your first integration to connect the chatbot with your workflows.</p>
              </div>
            )}
            
            <DialogFooter>
              <Button onClick={handleAddNew} className="w-full sm:w-auto flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Add New Integration
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ZapierManager;
