import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Brain,
  Network,
  Layers,
  Activity
} from 'lucide-react';

interface RenderingMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface RealityControlPanelProps {
  activeMode: string;
  isAnimating: boolean;
  renderQuality: number[];
  fieldIntensity: number[];
  showMetrics: boolean;
  onModeChange: (mode: string) => void;
  onAnimationToggle: () => void;
  onCameraReset: () => void;
  onMetricsToggle: () => void;
  onQualityChange: (value: number[]) => void;
  onIntensityChange: (value: number[]) => void;
}

export const RealityControlPanel: React.FC<RealityControlPanelProps> = ({
  activeMode,
  isAnimating,
  renderQuality,
  fieldIntensity,
  showMetrics,
  onModeChange,
  onAnimationToggle,
  onCameraReset,
  onMetricsToggle,
  onQualityChange,
  onIntensityChange
}) => {
  const renderingModes: RenderingMode[] = [
    {
      id: 'quantum',
      name: 'Quantum Field',
      icon: <Zap className="w-4 h-4" />,
      description: 'Quantum field visualization with particle dynamics'
    },
    {
      id: 'neural',
      name: 'Neural Network',
      icon: <Brain className="w-4 h-4" />,
      description: 'Neural network topology and activation patterns'
    },
    {
      id: 'dataflow',
      name: 'Data Streams',
      icon: <Network className="w-4 h-4" />,
      description: 'Real-time data flow and processing visualization'
    },
    {
      id: 'hybrid',
      name: 'Hybrid Reality',
      icon: <Layers className="w-4 h-4" />,
      description: 'Combined quantum, neural, and data visualizations'
    }
  ];

  return (
    <div className="absolute top-4 left-4 z-10 space-y-3 bg-black/80 p-3 rounded-lg border border-gray-600 max-w-xs">
      
      {/* Rendering Mode Selection */}
      <div className="space-y-2">
        <div className="text-xs text-cyan-400 font-semibold">Rendering Mode:</div>
        <div className="grid grid-cols-2 gap-1">
          {renderingModes.map(mode => (
            <Button
              key={mode.id}
              size="sm"
              variant={activeMode === mode.id ? 'default' : 'outline'}
              onClick={() => onModeChange(mode.id)}
              className="text-xs p-1 h-8"
              title={mode.description}
            >
              {mode.icon}
              <span className="ml-1 hidden sm:inline">{mode.name.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quality Controls */}
      <div className="space-y-2">
        <div className="text-xs text-cyan-400 font-semibold">Quality: {renderQuality[0]}%</div>
        <Slider
          value={renderQuality}
          onValueChange={onQualityChange}
          max={100}
          min={10}
          step={5}
          className="w-full"
        />
      </div>

      {/* Field Intensity */}
      <div className="space-y-2">
        <div className="text-xs text-cyan-400 font-semibold">Intensity: {fieldIntensity[0]}%</div>
        <Slider
          value={fieldIntensity}
          onValueChange={onIntensityChange}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Animation Controls */}
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={onAnimationToggle}
          className="text-xs"
        >
          {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCameraReset}
          className="text-xs"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onMetricsToggle}
          className="text-xs"
        >
          <Activity className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};