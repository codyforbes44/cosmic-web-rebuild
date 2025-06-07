
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save } from 'lucide-react';

interface ChatbotSettings {
  enabled: boolean;
  welcomeMessage: string;
  autoResponseDelay: number;
  maxResponseLength: number;
  enableTypingIndicator: boolean;
  enableSuggestions: boolean;
  enableFileUploads: boolean;
}

interface ChatbotSettingsProps {
  settings: ChatbotSettings;
  onSettingChange: (key: keyof ChatbotSettings, value: any) => void;
  onSaveSettings: () => void;
}

export const ChatbotSettingsComponent: React.FC<ChatbotSettingsProps> = ({
  settings,
  onSettingChange,
  onSaveSettings
}) => {
  return (
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
            onCheckedChange={(checked) => onSettingChange('enabled', checked)}
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <Label className="text-white">Welcome Message</Label>
          <Textarea
            value={settings.welcomeMessage}
            onChange={(e) => onSettingChange('welcomeMessage', e.target.value)}
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
            onChange={(e) => onSettingChange('autoResponseDelay', parseInt(e.target.value))}
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
              onCheckedChange={(checked) => onSettingChange('enableTypingIndicator', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Suggested Responses</Label>
              <p className="text-sm text-gray-400">Show quick response options</p>
            </div>
            <Switch
              checked={settings.enableSuggestions}
              onCheckedChange={(checked) => onSettingChange('enableSuggestions', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">File Uploads</Label>
              <p className="text-sm text-gray-400">Allow users to upload files</p>
            </div>
            <Switch
              checked={settings.enableFileUploads}
              onCheckedChange={(checked) => onSettingChange('enableFileUploads', checked)}
            />
          </div>
        </div>

        <Button 
          onClick={onSaveSettings}
          className="w-full bg-accent hover:bg-accent/80"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};
