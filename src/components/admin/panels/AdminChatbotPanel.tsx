
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  Brain, 
  Zap,
  Clock,
  Users,
  BarChart3,
  Save,
  RefreshCw,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

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
      response: 'Our support team is available Monday-Friday, 8 AM to 6 PM ET. You can reach us at support@zbi-consulting.com.',
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

  const chatbotMetrics = [
    { name: 'Active Conversations', value: '24', icon: MessageSquare, color: 'text-blue-400' },
    { name: 'Messages Today', value: '156', icon: BarChart3, color: 'text-green-400' },
    { name: 'Response Rate', value: '98%', icon: Zap, color: 'text-yellow-400' },
    { name: 'Avg Response Time', value: '2.3s', icon: Clock, color: 'text-purple-400' },
  ];

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

  return (
    <div className="space-y-6">
      {/* Chatbot Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {chatbotMetrics.map((metric, index) => (
          <Card key={index} className="bg-space-deep-blue border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Settings */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Chatbot Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure chatbot behavior and appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enable/Disable Chatbot */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable Chatbot</Label>
                <p className="text-sm text-gray-400">Turn the chatbot on or off globally</p>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
              />
            </div>

            {/* Welcome Message */}
            <div className="space-y-2">
              <Label className="text-white">Welcome Message</Label>
              <Textarea
                value={settings.welcomeMessage}
                onChange={(e) => handleSettingChange('welcomeMessage', e.target.value)}
                className="bg-black/20 border-gray-600 text-white"
                rows={3}
              />
            </div>

            {/* Response Delay */}
            <div className="space-y-2">
              <Label className="text-white">Auto Response Delay (ms)</Label>
              <Input
                type="number"
                value={settings.autoResponseDelay}
                onChange={(e) => handleSettingChange('autoResponseDelay', parseInt(e.target.value))}
                className="bg-black/20 border-gray-600 text-white"
              />
            </div>

            {/* Feature Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Typing Indicator</Label>
                  <p className="text-sm text-gray-400">Show typing animation</p>
                </div>
                <Switch
                  checked={settings.enableTypingIndicator}
                  onCheckedChange={(checked) => handleSettingChange('enableTypingIndicator', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Suggested Responses</Label>
                  <p className="text-sm text-gray-400">Show quick response options</p>
                </div>
                <Switch
                  checked={settings.enableSuggestions}
                  onCheckedChange={(checked) => handleSettingChange('enableSuggestions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">File Uploads</Label>
                  <p className="text-sm text-gray-400">Allow users to upload files</p>
                </div>
                <Switch
                  checked={settings.enableFileUploads}
                  onCheckedChange={(checked) => handleSettingChange('enableFileUploads', checked)}
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveSettings}
              className="w-full bg-accent hover:bg-accent/80"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Chatbot Responses */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Auto Responses
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage automated chatbot responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responses.map((response) => (
                <div 
                  key={response.id} 
                  className="p-4 bg-black/20 rounded-lg border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-accent border-accent">
                        {response.category}
                      </Badge>
                      <span className="text-white font-medium">
                        Trigger: "{response.trigger}"
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={response.enabled}
                        onCheckedChange={() => toggleResponse(response.id)}
                        size="sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingResponse(response.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResponse(response.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{response.response}</p>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full border-gray-600 hover:bg-gray-800"
              >
                Add New Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Integration */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Integration
          </CardTitle>
          <CardDescription className="text-gray-400">
            Configure AI-powered responses and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/20 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">OpenAI Integration</span>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Advanced AI responses for complex queries
              </p>
              <Button variant="outline" size="sm" className="border-gray-600">
                Configure
              </Button>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">Zapier Integration</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">Connected</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Automate workflows and data collection
              </p>
              <Button variant="outline" size="sm" className="border-gray-600">
                Manage
              </Button>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">Live Chat Handoff</span>
                <Badge className="bg-blue-500/20 text-blue-400">Ready</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Transfer to human agents when needed
              </p>
              <Button variant="outline" size="sm" className="border-gray-600">
                Setup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
