
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { ZapierWebhook, getStoredWebhooks, saveWebhook, removeWebhook } from './zapierIntegration';

interface ZapierManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZapierManager: React.FC<ZapierManagerProps> = ({ isOpen, onClose }) => {
  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>(getStoredWebhooks());
  const [newWebhook, setNewWebhook] = useState<Partial<ZapierWebhook>>({
    name: '',
    url: '',
    description: '',
    category: ''
  });
  const { toast } = useToast();
  
  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || !newWebhook.category) {
      toast({
        title: "Missing information",
        description: "Please provide a name, URL, and category for your webhook.",
        variant: "destructive"
      });
      return;
    }
    
    const webhook: ZapierWebhook = {
      id: uuidv4(),
      name: newWebhook.name,
      url: newWebhook.url,
      description: newWebhook.description || '',
      category: newWebhook.category
    };
    
    saveWebhook(webhook);
    setWebhooks(getStoredWebhooks());
    setNewWebhook({ name: '', url: '', description: '', category: '' });
    
    toast({
      title: "Webhook added",
      description: `"${webhook.name}" webhook has been added successfully.`
    });
  };
  
  const handleRemoveWebhook = (id: string) => {
    removeWebhook(id);
    setWebhooks(getStoredWebhooks());
    
    toast({
      title: "Webhook removed",
      description: "The webhook has been removed successfully."
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Zapier Integration Manager</DialogTitle>
          <DialogDescription>
            Add and manage your Zapier webhooks to connect with ƷBI Assistant.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-md font-medium">Add New Webhook</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">Webhook Name</Label>
                <Input 
                  id="name" 
                  value={newWebhook.name} 
                  onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                  placeholder="e.g., Create Task"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">
                  Command Category 
                  <span className="text-xs text-gray-500 ml-1">(used to trigger this webhook)</span>
                </Label>
                <Input 
                  id="category" 
                  value={newWebhook.category} 
                  onChange={(e) => setNewWebhook({...newWebhook, category: e.target.value})}
                  placeholder="e.g., task"
                />
                <p className="text-xs text-gray-500">
                  You'll trigger this webhook by typing "zap task" in the chat
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input 
                  id="webhook" 
                  value={newWebhook.url} 
                  onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input 
                  id="description" 
                  value={newWebhook.description} 
                  onChange={(e) => setNewWebhook({...newWebhook, description: e.target.value})}
                  placeholder="What does this webhook do?"
                />
              </div>
              
              <Button 
                onClick={handleAddWebhook} 
                className="w-full mt-2"
                variant="secondary"
              >
                <Plus size={16} className="mr-2" /> Add Webhook
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">Your Webhooks</h3>
            
            {webhooks.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No webhooks added yet.</p>
            ) : (
              <div className="space-y-3">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-start justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    <div className="space-y-1">
                      <h4 className="font-medium">{webhook.name}</h4>
                      <p className="text-xs text-gray-500">Category: {webhook.category}</p>
                      {webhook.description && (
                        <p className="text-xs">{webhook.description}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveWebhook(webhook.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X size={16} className="mr-2" /> Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ZapierManager;
