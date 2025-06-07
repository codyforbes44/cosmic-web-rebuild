
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Brain, Edit, Trash2 } from 'lucide-react';

interface ChatbotResponse {
  id: string;
  trigger: string;
  response: string;
  category: string;
  enabled: boolean;
}

interface ChatbotResponsesProps {
  responses: ChatbotResponse[];
  onToggleResponse: (id: string) => void;
  onDeleteResponse: (id: string) => void;
  onEditResponse: (id: string) => void;
}

export const ChatbotResponsesComponent: React.FC<ChatbotResponsesProps> = ({
  responses,
  onToggleResponse,
  onDeleteResponse,
  onEditResponse
}) => {
  return (
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
                    onCheckedChange={() => onToggleResponse(response.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditResponse(response.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteResponse(response.id)}
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
  );
};
