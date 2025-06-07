
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOpenAI } from '@/hooks/useOpenAI';
import { OPENAI_CONFIG } from '@/config/openai';
import { buildOpenAIRequest } from '@/utils/aiUtils';
import { Loader2, Brain, MessageSquare, Settings, Zap } from 'lucide-react';

const OpenAIPlayground = () => {
  const [selectedModel, setSelectedModel] = useState<'fast' | 'balanced' | 'powerful'>('fast');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [systemPrompt, setSystemPrompt] = useState('general');
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  
  const { isLoading, invoke } = useOpenAI();

  const modelOptions = [
    { value: 'fast', label: 'GPT-4o Mini (Fast)', icon: Zap, description: 'Quick responses for general tasks' },
    { value: 'balanced', label: 'GPT-4o (Balanced)', icon: Brain, description: 'Great balance of speed and capability' },
    { value: 'powerful', label: 'GPT-4o (Powerful)', icon: Settings, description: 'Most capable for complex tasks' },
  ];

  const systemPromptOptions = Object.keys(OPENAI_CONFIG.systemPrompts).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user' as const, content: userMessage };
    setConversation(prev => [...prev, newUserMessage]);

    try {
      const request = buildOpenAIRequest(userMessage, {
        model: selectedModel,
        temperature,
        maxTokens,
        systemPrompt
      });

      const result = await invoke(request);
      
      if (result?.choices?.[0]?.message?.content) {
        const assistantMessage = { 
          role: 'assistant' as const, 
          content: result.choices[0].message.content 
        };
        setConversation(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('OpenAI request failed:', error);
    }

    setUserMessage('');
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          OpenAI Chat Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Model</label>
            <Select value={selectedModel} onValueChange={(value: 'fast' | 'balanced' | 'powerful') => setSelectedModel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model) => {
                  const Icon = model.icon;
                  return (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{model.label}</div>
                          <div className="text-xs text-gray-500">{model.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">System Prompt</label>
            <Select value={systemPrompt} onValueChange={setSystemPrompt}>
              <SelectTrigger>
                <SelectValue placeholder="Select system prompt" />
              </SelectTrigger>
              <SelectContent>
                {systemPromptOptions.map((prompt) => (
                  <SelectItem key={prompt.value} value={prompt.value}>
                    {prompt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Temperature: {temperature}</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Tokens: {maxTokens}</label>
            <input
              type="range"
              min="100"
              max="4000"
              step="100"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Conversation Display */}
        {conversation.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Conversation</h4>
              <Button variant="outline" size="sm" onClick={clearConversation}>
                Clear
              </Button>
            </div>
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-100 ml-8' 
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <div className="font-medium text-sm mb-1">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
          </div>
        )}

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Message</label>
            <Textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmit();
                }
              }}
            />
            <div className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter (Cmd+Enter on Mac) to send
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !userMessage.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenAIPlayground;
