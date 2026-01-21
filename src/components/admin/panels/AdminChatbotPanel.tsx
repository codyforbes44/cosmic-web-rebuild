
import React, { useState } from 'react';
import { ChatbotMetrics } from './chatbot/ChatbotMetrics';
import { ChatbotSettingsComponent } from './chatbot/ChatbotSettings';
import { ChatbotResponsesComponent } from './chatbot/ChatbotResponses';
import { ChatbotIntegrations } from './chatbot/ChatbotIntegrations';

interface ChatbotSettings {
  enabled: boolean;
  welcomeMessage: string;
  autoResponseDelay: number;
  maxResponseLength: number;
  enableTypingIndicator: boolean;
  enableSuggestions: boolean;
  enableFileUploads: boolean;
}

interface ChatbotResponse {
  id: string;
  trigger: string;
  response: string;
  category: string;
  enabled: boolean;
}

export const AdminChatbotPanel: React.FC = () => {
  const [settings, setSettings] = useState<ChatbotSettings>({
    enabled: true,
    welcomeMessage: "Hello! I'm here to help you with any questions about ƷBI's products and services. How can I assist you today?",
    autoResponseDelay: 2000,
    maxResponseLength: 500,
    enableTypingIndicator: true,
    enableSuggestions: true,
    enableFileUploads: false
  });

  const [responses, setResponses] = useState<ChatbotResponse[]>([
    {
      id: '1',
      trigger: 'pricing',
      response: 'Our pricing varies based on your specific needs. Please contact our sales team for a customized quote.',
      category: 'Sales',
      enabled: true
    },
    {
      id: '2',
      trigger: 'support',
      response: 'Our support team is available Monday-Friday, 8 AM to 6 PM ET. You can reach us at support@3bi.io.',
      category: 'Support',
      enabled: true
    },
    {
      id: '3',
      trigger: 'demo',
      response: 'I\'d be happy to help you schedule a demo! Please click the "Request Demo" button to get started.',
      category: 'Sales',
      enabled: true
    }
  ]);

  const [editingResponse, setEditingResponse] = useState<string | null>(null);

  const handleSettingChange = (key: keyof ChatbotSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving chatbot settings:', settings);
    // Here you would save to your backend
  };

  const toggleResponse = (id: string) => {
    setResponses(prev => prev.map(response => 
      response.id === id ? { ...response, enabled: !response.enabled } : response
    ));
  };

  const deleteResponse = (id: string) => {
    setResponses(prev => prev.filter(response => response.id !== id));
  };

  const editResponse = (id: string) => {
    setEditingResponse(id);
  };

  return (
    <div className="space-y-6">
      {/* Chatbot Metrics */}
      <ChatbotMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Settings */}
        <ChatbotSettingsComponent
          settings={settings}
          onSettingChange={handleSettingChange}
          onSaveSettings={handleSaveSettings}
        />

        {/* Chatbot Responses */}
        <ChatbotResponsesComponent
          responses={responses}
          onToggleResponse={toggleResponse}
          onDeleteResponse={deleteResponse}
          onEditResponse={editResponse}
        />
      </div>

      {/* AI Integration */}
      <ChatbotIntegrations />
    </div>
  );
};
