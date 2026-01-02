import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAI, AI_MODELS, type AIModelKey } from '@/hooks/useAI';
import { Loader2, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
  model?: AIModelKey;
  enableStreaming?: boolean;
}

const AIChatInterface = ({
  title = "AI Assistant",
  systemPrompt = "You are a helpful AI assistant.",
  placeholder = "Type your message here...",
  className = "",
  maxHeight = "500px",
  model = "gemini-flash",
  enableStreaming = false
}: AIChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { isLoading, invoke, streamChat } = useAI({
    functionName: 'openai-chat',
    onSuccess: (data) => {
      if (!enableStreaming && data?.choices?.[0]?.message?.content) {
        const assistantMessage: Message = {
          id: Date.now().toString() + '_assistant',
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    }
  });

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    const chatMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user' as const, content: currentInput }
    ];

    try {
      if (enableStreaming) {
        setStreamingContent('');
        let fullContent = '';
        
        await streamChat(chatMessages, { model }, {
          onDelta: (chunk) => {
            fullContent += chunk;
            setStreamingContent(fullContent);
          },
          onDone: () => {
            const assistantMessage: Message = {
              id: Date.now().toString() + '_assistant',
              role: 'assistant',
              content: fullContent,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setStreamingContent('');
          }
        });
      } else {
        await invoke(chatMessages, { model });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="border rounded-lg p-4" style={{ maxHeight }}>
          <div ref={scrollRef} className="space-y-4">
            {messages.length === 0 && !streamingContent && (
              <div className="text-center text-muted-foreground py-8">
                Start a conversation with the AI assistant
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Streaming response */}
            {streamingContent && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted text-foreground">
                    <p className="whitespace-pre-wrap">{streamingContent}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Loading indicator for non-streaming */}
            {isLoading && !enableStreaming && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted text-foreground">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            size="lg"
            className="px-4"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
