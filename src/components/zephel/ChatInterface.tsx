import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Zap, Loader2 } from 'lucide-react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
  isProcessing: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  onSendMessage,
  isProcessing
}) => {
  return (
    <Card className="lg:col-span-2 bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Architect Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Messages */}
        <div className="h-96 overflow-y-auto space-y-3 p-3 bg-black/20 rounded border border-gray-800">
          {messages.map((message, index) => (
            <div key={index} className={`p-3 rounded ${
              message.role === 'user' 
                ? 'bg-accent/20 ml-6 border border-accent/30' 
                : message.role === 'assistant'
                ? 'bg-gray-800/50 mr-6 border border-gray-700'
                : 'bg-blue-800/50 mr-6 border border-blue-700'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-accent">
                  {message.role === 'user' ? 'ARCHITECT' : message.role === 'assistant' ? 'ZEPHEL' : 'SYSTEM'}
                </span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <div className="text-sm text-gray-200 font-mono">{message.content}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter directive..."
            className="bg-black/30 border-gray-700 text-white font-mono resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                onSendMessage();
              }
            }}
          />
          <Button 
            onClick={onSendMessage}
            disabled={!input.trim() || isProcessing}
            className="w-full bg-accent hover:bg-accent/80 text-black"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Execute Directive
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};