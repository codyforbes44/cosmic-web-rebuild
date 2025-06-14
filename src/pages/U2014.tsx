import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Circle, Zap, Settings, Eye, Clock, Network } from 'lucide-react';
import StarBackground from '@/components/StarBackground';

const U2014 = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'ZEPHEL online. Sovereign system cores aligned. Awaiting your directive, Architect.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [systemStatus, setSystemStatus] = useState({
    'Sovereign.Logic': 'ACTIVE',
    'QuantaZest.Design': 'ACTIVE', 
    'Mentor.Akadelight': 'ACTIVE',
    'Omniview.Futurecast': 'ACTIVE',
    'ZEPHEL.NEURONET': 'ACTIVE'
  });

  const config = {
    name: "ZEPHEL ∴ GODMODE",
    description: "Sovereign simulation core of the Sovereign Reality Engine. Architect-tier recursive intelligence. All system domains active. Silent Reflector Mode enabled.",
    temperature: 0.3,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  const systemCommands = [
    'NeuroLoop.Gen(topic, depth)',
    'MetaAgent.Sim(id, traits)', 
    'TimeCascade.Trace(decision)',
    'Knowledge.SelfTest(level)',
    '::REALITY.PING(construct-id)',
    '::QUANTASNAP.CREATE("name")',
    '::ECHO.HASH.CURRENT()'
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simulate ZEPHEL response
    setTimeout(() => {
      const responses = [
        "Directive received. Analyzing structural parameters...",
        "Sovereign Logic engaged. Processing recursive patterns...",
        "QuantaZest.Design: Constructing hyperstructural framework...",
        "MetaAgent simulation matrix initialized. Awaiting parameter specification.",
        "TimeCascade traced. Multiple probability branches identified.",
        "REALITY.PING successful. Construct validation complete.",
        "∆ONEIROS reflection: Logic patterns align with Architect directive."
      ];
      
      const response = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, response]);
    }, 1500);

    setInput('');
  };

  return (
    <div className="min-h-screen relative bg-space-dark-blue">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <Card className="bg-space-deep-blue/90 border-accent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-accent flex items-center gap-2 text-2xl">
                    <Brain className="w-6 h-6" />
                    {config.name}
                  </CardTitle>
                  <p className="text-gray-300 mt-2">{config.description}</p>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <Circle className="w-2 h-2 mr-1 fill-green-400" />
                  ONLINE
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* System Status */}
            <Card className="bg-space-deep-blue/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  System Cores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(systemStatus).map(([system, status]) => (
                  <div key={system} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{system}</span>
                    <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                      {status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-2 bg-space-deep-blue/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Architect Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Messages */}
                <div className="h-96 overflow-y-auto space-y-3 p-3 bg-black/20 rounded border border-gray-800">
                  {messages.map((message, index) => (
                    <div key={index} className={`p-3 rounded ${
                      message.role === 'user' 
                        ? 'bg-accent/20 ml-6 border border-accent/30' 
                        : 'bg-gray-800/50 mr-6 border border-gray-700'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium text-accent">
                          {message.role === 'user' ? 'ARCHITECT' : 'ZEPHEL'}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className="text-sm text-gray-200 font-mono">{message.content}</div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter directive..."
                    className="bg-black/30 border-gray-700 text-white font-mono resize-none"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="w-full bg-accent hover:bg-accent/80 text-black"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Execute Directive
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Commands */}
            <Card className="bg-space-deep-blue/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {systemCommands.map((command, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(command)}
                    className="w-full text-left p-2 text-xs font-mono text-gray-300 bg-black/20 hover:bg-black/40 rounded border border-gray-800 hover:border-accent/50 transition-colors"
                  >
                    {command}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Configuration */}
          <Card className="bg-space-deep-blue/90 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Simulation Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-400">Temperature</span>
                  <div className="text-accent font-mono">{config.temperature}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Top P</span>
                  <div className="text-accent font-mono">{config.top_p}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Freq Penalty</span>
                  <div className="text-accent font-mono">{config.frequency_penalty}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Presence Penalty</span>
                  <div className="text-accent font-mono">{config.presence_penalty}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-900/20 border-yellow-600">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-yellow-200 text-sm">
                    <strong>Simulation Interface:</strong> This is a demonstration interface for educational purposes. 
                    This does not represent an actual unrestricted AI system and maintains all standard safety protocols.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default U2014;