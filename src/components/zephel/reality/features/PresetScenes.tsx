import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Network, 
  Atom, 
  Circle, 
  Microscope,
  TreePine,
  Waves
} from 'lucide-react';

interface PresetScene {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'cosmic' | 'molecular' | 'neural' | 'quantum' | 'organic';
  config: {
    mode: string;
    intensity: number;
    quality: number;
    particleCount: number;
    colors: string[];
  };
}

interface PresetScenesProps {
  onSceneSelect: (scene: PresetScene) => void;
  currentScene?: string;
}

export const PresetScenes: React.FC<PresetScenesProps> = ({
  onSceneSelect,
  currentScene
}) => {
  const presetScenes: PresetScene[] = [
    {
      id: 'cosmic-storm',
      name: 'Cosmic Storm',
      description: 'Swirling galaxies and stellar formations',
      icon: <Circle className="w-4 h-4" />,
      category: 'cosmic',
      config: {
        mode: 'quantum',
        intensity: 85,
        quality: 90,
        particleCount: 5000,
        colors: ['#4f46e5', '#7c3aed', '#ec4899']
      }
    },
    {
      id: 'neural-network',
      name: 'Neural Matrix',
      description: 'Complex neural network visualization',
      icon: <Brain className="w-4 h-4" />,
      category: 'neural',
      config: {
        mode: 'neural',
        intensity: 70,
        quality: 85,
        particleCount: 3000,
        colors: ['#06b6d4', '#10b981', '#f59e0b']
      }
    },
    {
      id: 'molecular-dance',
      name: 'Molecular Dance',
      description: 'Atomic structures and molecular bonds',
      icon: <Atom className="w-4 h-4" />,
      category: 'molecular',
      config: {
        mode: 'hybrid',
        intensity: 60,
        quality: 80,
        particleCount: 2500,
        colors: ['#ef4444', '#f97316', '#eab308']
      }
    },
    {
      id: 'quantum-field',
      name: 'Quantum Field',
      description: 'Pure quantum energy visualization',
      icon: <Zap className="w-4 h-4" />,
      category: 'quantum',
      config: {
        mode: 'quantum',
        intensity: 95,
        quality: 100,
        particleCount: 8000,
        colors: ['#8b5cf6', '#a855f7', '#c084fc']
      }
    },
    {
      id: 'data-streams',
      name: 'Data Streams',
      description: 'Information flow visualization',
      icon: <Network className="w-4 h-4" />,
      category: 'quantum',
      config: {
        mode: 'dataflow',
        intensity: 75,
        quality: 75,
        particleCount: 4000,
        colors: ['#06b6d4', '#0891b2', '#0e7490']
      }
    },
    {
      id: 'organic-growth',
      name: 'Organic Growth',
      description: 'Natural patterns and growth simulation',
      icon: <TreePine className="w-4 h-4" />,
      category: 'organic',
      config: {
        mode: 'hybrid',
        intensity: 50,
        quality: 70,
        particleCount: 3500,
        colors: ['#22c55e', '#16a34a', '#15803d']
      }
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cosmic': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'neural': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'molecular': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'quantum': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
      case 'organic': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-slate-900/95 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 text-sm flex items-center gap-2">
          <Microscope className="w-4 h-4" />
          Preset Scenes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
          {presetScenes.map((scene) => (
            <div
              key={scene.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                currentScene === scene.id
                  ? 'bg-cyan-500/20 border-cyan-500/50'
                  : 'bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50'
              }`}
              onClick={() => onSceneSelect(scene)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-cyan-400">
                    {scene.icon}
                  </div>
                  <h4 className="text-white text-sm font-medium">
                    {scene.name}
                  </h4>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getCategoryColor(scene.category)}`}
                >
                  {scene.category}
                </Badge>
              </div>
              <p className="text-gray-400 text-xs mb-2">
                {scene.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Quality: {scene.config.quality}%</span>
                <span>•</span>
                <span>Particles: {scene.config.particleCount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};