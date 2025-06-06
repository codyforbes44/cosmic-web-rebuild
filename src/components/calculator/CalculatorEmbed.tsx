
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';

const CalculatorEmbed = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Generate embed code with current origin
  const embedCode = `<iframe src="${window.location.origin}/calculator?embed=true" width="400" height="600" style="border:1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" title="Ʒʙɪ Scientific Calculator"></iframe>`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Embed code has been copied to your clipboard"
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-gray-300 border-gray-600 hover:bg-gray-700">
          <Share2 size={16} />
          Embed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-brand-gold">Embed Calculator</DialogTitle>
          <DialogDescription className="text-gray-300">
            Copy the code below to embed this calculator on your website.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              readOnly
              value={embedCode}
              className="bg-gray-700 border-gray-600 text-sm text-gray-200"
            />
          </div>
          <Button size="sm" variant="outline" className="px-3 border-gray-600" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2 text-gray-200">Preview</h4>
          <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
            <div className="text-xs font-mono text-gray-400 break-all">
              {embedCode}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorEmbed;
