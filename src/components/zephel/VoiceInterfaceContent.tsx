
import React from 'react';
import { Mic, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZephelVoiceInterface } from '@/components/zephel/ZephelVoiceInterface';
import { ZephelInterface } from '@/components/zephel/ZephelInterface';
import { SessionStats } from './SessionStats';
import { RecentMessages } from './RecentMessages';
import { ProfessionalChatInterface } from './ProfessionalChatInterface';

interface VoiceInterfaceContentProps {
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  voiceMessages: string[];
  onVoiceMessage: (message: string) => void;
  systemMode: 'professional' | 'godmode';
  professionalInput: string;
  setProfessionalInput: (value: string) => void;
  professionalMessages: Array<{role: 'user' | 'assistant', content: string}>;
  isProfessionalProcessing: boolean;
  handleProfessionalChat: () => void;
}

export const VoiceInterfaceContent: React.FC<VoiceInterfaceContentProps> = ({
  voiceEnabled,
  setVoiceEnabled,
  voiceMessages,
  onVoiceMessage,
  systemMode,
  professionalInput,
  setProfessionalInput,
  professionalMessages,
  isProfessionalProcessing,
  handleProfessionalChat
}) => {
  return (
    <Tabs defaultValue="interface" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 bg-space-deep-blue/90 border-gray-700">
        <TabsTrigger 
          value="interface" 
          className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-black"
        >
          <Mic className="w-4 h-4" />
          Voice Interface
        </TabsTrigger>
        <TabsTrigger 
          value="text"
          className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-black"
        >
          <MessageSquare className="w-4 h-4" />
          Text Interface
        </TabsTrigger>
      </TabsList>

      <TabsContent value="interface" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ZephelVoiceInterface
              onVoiceMessage={onVoiceMessage}
              isEnabled={voiceEnabled}
            />
          </div>
          
          <div className="space-y-4">
            <SessionStats
              voiceMessages={voiceMessages}
              voiceEnabled={voiceEnabled}
              systemMode={systemMode}
            />
            <RecentMessages voiceMessages={voiceMessages} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="text" className="space-y-6">
        <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            <span className="text-white text-sm font-medium">Text Interface Mode</span>
            <span className={`text-xs px-2 py-1 rounded ${
              systemMode === 'godmode' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
            }`}>
              {systemMode === 'godmode' ? 'GODMODE' : 'PROFESSIONAL'}
            </span>
          </div>
          <p className="text-gray-400 text-xs">
            {systemMode === 'professional' 
              ? 'Professional business technology consultant mode. Enhanced architect features require passcode authentication.'
              : 'Full ƷBI architect interface with advanced simulation capabilities and collaborative intelligence features.'
            }
          </p>
        </div>
        
        {systemMode === 'professional' ? (
          <ProfessionalChatInterface
            professionalInput={professionalInput}
            setProfessionalInput={setProfessionalInput}
            professionalMessages={professionalMessages}
            isProfessionalProcessing={isProfessionalProcessing}
            onSendMessage={handleProfessionalChat}
          />
        ) : (
          <ZephelInterface userId="voice_interface_user" />
        )}
      </TabsContent>
    </Tabs>
  );
};
