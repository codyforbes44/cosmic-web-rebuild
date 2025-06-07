
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Users } from 'lucide-react';

export const ChatbotIntegrations: React.FC = () => {
  return (
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
  );
};
