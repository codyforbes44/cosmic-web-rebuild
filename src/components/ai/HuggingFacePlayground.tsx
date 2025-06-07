
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHuggingFace } from '@/hooks/useHuggingFace';
import { HUGGINGFACE_CONFIG } from '@/config/huggingface';
import { Loader2, Sparkles, Image, MessageSquare, Heart } from 'lucide-react';

const HuggingFacePlayground = () => {
  const [selectedTask, setSelectedTask] = useState<string>('textGeneration');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  
  const { isLoading, invoke } = useHuggingFace();

  const taskOptions = [
    { value: 'textGeneration', label: 'Text Generation', icon: MessageSquare },
    { value: 'textClassification', label: 'Text Classification', icon: Heart },
    { value: 'imageGeneration', label: 'Image Generation', icon: Image },
  ];

  const getModelsForTask = (task: string) => {
    switch (task) {
      case 'textGeneration':
        return Object.entries(HUGGINGFACE_CONFIG.textGeneration);
      case 'textClassification':
        return Object.entries(HUGGINGFACE_CONFIG.textClassification);
      case 'imageGeneration':
        return Object.entries(HUGGINGFACE_CONFIG.imageGeneration);
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    if (!selectedModel || !input.trim()) return;

    try {
      const result = await invoke({
        model: selectedModel,
        inputs: input,
        parameters: selectedTask === 'textGeneration' ? { max_length: 100 } : undefined
      });
      setResult(result);
    } catch (error) {
      console.error('Hugging Face request failed:', error);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.image) {
      return (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Generated Image:</h4>
          <img src={result.image} alt="Generated" className="max-w-full h-auto rounded-lg" />
        </div>
      );
    }

    if (Array.isArray(result)) {
      return (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Results:</h4>
          <div className="space-y-2">
            {result.map((item, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Result:</h4>
        <div className="p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Hugging Face AI Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Type</label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {taskOptions.map((task) => {
                  const Icon = task.icon;
                  return (
                    <SelectItem key={task.value} value={task.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {task.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Model</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {getModelsForTask(selectedTask).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key} ({value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {selectedTask === 'imageGeneration' ? 'Image Description' : 'Text Input'}
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              selectedTask === 'imageGeneration' 
                ? "Describe the image you want to generate..."
                : selectedTask === 'textClassification'
                ? "Enter text to classify..."
                : "Enter text to generate from..."
            }
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !selectedModel || !input.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Run Model'
          )}
        </Button>

        {renderResult()}
      </CardContent>
    </Card>
  );
};

export default HuggingFacePlayground;
