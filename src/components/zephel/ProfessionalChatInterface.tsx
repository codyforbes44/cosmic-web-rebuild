
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ProfessionalChatInterfaceProps {
  professionalInput: string;
  setProfessionalInput: (value: string) => void;
  professionalMessages: Message[];
  isProfessionalProcessing: boolean;
  onSendMessage: () => void;
}

export const ProfessionalChatInterface: React.FC<ProfessionalChatInterfaceProps> = ({
  professionalInput,
  setProfessionalInput,
  professionalMessages,
  isProfessionalProcessing,
  onSendMessage
}) => {
  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
        <div className="h-64 overflow-y-auto space-y-3 mb-4">
          {professionalMessages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              Ask me about our business technology solutions...
            </div>
          ) : (
            professionalMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded ${
                  message.role === 'user'
                    ? 'bg-accent/20 ml-6 border border-accent/30'
                    : 'bg-gray-800/50 mr-6 border border-gray-700'
                }`}
              >
                <div className="text-xs font-medium text-accent mb-1">
                  {message.role === 'user' ? 'YOU' : 'ƷBI ASSISTANT'}
                </div>
                <div className="text-sm text-gray-200">{message.content}</div>
              </div>
            ))
          )}
          {isProfessionalProcessing && (
            <div className="bg-gray-800/50 mr-6 border border-gray-700 p-3 rounded">
              <div className="text-xs font-medium text-accent mb-1">ƷBI ASSISTANT</div>
              <div className="text-sm text-gray-200">Thinking...</div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <Textarea
            value={professionalInput}
            onChange={(e) => setProfessionalInput(e.target.value)}
            placeholder="Ask about our services, pricing, or schedule a consultation..."
            className="bg-black/30 border-gray-700 text-white resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                onSendMessage();
              }
            }}
          />
          <Button 
            onClick={onSendMessage}
            disabled={!professionalInput.trim() || isProfessionalProcessing}
            className="w-full bg-accent hover:bg-accent/80 text-black"
          >
            {isProfessionalProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
