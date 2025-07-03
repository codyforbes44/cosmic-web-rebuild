
import React from 'react';
import { MessageSquare, Lock, Send } from 'lucide-react';
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
      <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-accent" />
          <h3 className="text-white text-lg font-medium">ƷBI Professional Assistant</h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Welcome to ƷBI's professional business technology consultant. I can help you with:
          </p>
          <ul className="text-gray-400 text-sm space-y-2 ml-4">
            <li>• Web Development Services ($2,500-$25,000+)</li>
            <li>• AI Solutions & Integration ($5,000-$50,000+)</li>
            <li>• Digital Marketing Services ($1,500-$7,500/month)</li>
            <li>• Strategy Consulting ($10,000-$100,000+)</li>
            <li>• Social Media Management ($1,200-$5,000/month)</li>
          </ul>
          <div className="bg-green-900/20 border border-green-600 rounded p-3 mt-4">
            <p className="text-green-200 text-sm font-medium">Ready to get started?</p>
            <p className="text-green-300 text-xs mt-1">
              Schedule your FREE consultation to discuss your specific needs and receive customized project recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            <Lock className="w-3 h-3" />
            <span>Enhanced architect features require authentication</span>
          </div>
        </div>
      </div>

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
