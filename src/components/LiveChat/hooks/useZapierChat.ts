
import { ChatMessage } from '../types';
import { useToast } from '@/hooks/use-toast';
import { 
  processZapierCommand, 
  findWebhookByCategory, 
  triggerZapierWebhook,
  parseZapierResponse
} from '../zapierIntegration';

export const useZapierChat = (
  isAuthenticated: boolean,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsThinking: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleZapierCommand = (message: string): boolean => {
    // Early return if user is not authenticated
    if (!isAuthenticated) {
      return false;
    }
    
    const { isCommand, webhookCategory, payload } = processZapierCommand(message);
    
    if (!isCommand || !webhookCategory) {
      return false;
    }
    
    // Find registered webhook for this category
    const webhook = findWebhookByCategory(webhookCategory);
    
    if (!webhook) {
      // Add bot message saying webhook not found
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          text: `I couldn't find a Zapier integration named "${webhookCategory}". Please check the available integrations in the Zapier Manager.`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }, 1000);
      
      toast({
        title: "Zapier Integration Not Found",
        description: `No integration named "${webhookCategory}" is configured.`,
        variant: "destructive",
      });
      
      return true; // We handled it as a command
    }
    
    // Show thinking state
    setIsThinking(true);
    
    // Trigger the webhook
    triggerZapierWebhook(webhook, payload)
      .then(response => {
        setIsThinking(false);
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          let responseText: string;
          
          if (response.success) {
            responseText = `Successfully triggered "${webhook.name}"${response.data ? ':\n\n' + parseZapierResponse(response.data) : '.'}`;
            
            toast({
              title: "Zapier Integration Triggered",
              description: `"${webhook.name}" was successfully triggered.`,
            });
          } else {
            responseText = `There was a problem triggering "${webhook.name}": ${response.error || 'Unknown error'}`;
            
            toast({
              title: "Zapier Integration Failed",
              description: response.error || "Failed to trigger the integration.",
              variant: "destructive",
            });
          }
          
          const botMessage: ChatMessage = {
            id: Date.now().toString(),
            text: responseText,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botMessage]);
        }, 1500);
      })
      .catch(error => {
        setIsThinking(false);
        
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          text: `Error triggering "${webhook.name}": ${error.message || 'Unknown error'}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "Zapier Integration Error",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      });
    
    return true;
  };

  return { handleZapierCommand };
};
