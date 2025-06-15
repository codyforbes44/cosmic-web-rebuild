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
  Activity,
  Circle
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
      name: 'Quantum',
      icon: <Zap className="w-3 h-3" />,
      description: 'Quantum field visualization with particle dynamics'
    },
    {
      id: 'neural',
      name: 'Neural',
      icon: <Circle className="w-3 h-3" />,
      description: 'Neural network topology and activation patterns'
    },
    {
      id: 'dataflow',
      name: 'Data',
      icon: <Network className="w-3 h-3" />,
      description: 'Real-time data flow and processing visualization'
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      icon: <Layers className="w-3 h-3" />,
      description: 'Combined quantum, neural, and data visualizations'
    }
  ];

  return (
    <div className="absolute top-4 left-4 z-10 w-64 bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 space-y-4">
      
      {/* Rendering Mode Selection */}
      <div className="space-y-3">
        <div className="text-sm text-cyan-400 font-medium">Rendering Mode:</div>
        <div className="grid grid-cols-2 gap-2">
          {renderingModes.map(mode => (
            <Button
              key={mode.id}
              size="sm"
              variant={activeMode === mode.id ? 'default' : 'outline'}
              onClick={() => onModeChange(mode.id)}
              className={`text-xs h-9 flex items-center justify-center gap-2 ${
                activeMode === mode.id 
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600'
              }`}
              title={mode.description}
            >
              {mode.icon}
              <span>{mode.name.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quality Controls */}
      <div className="space-y-3">
        <div className="text-sm text-cyan-400 font-medium">Quality: {renderQuality[0]}%</div>
        <div className="relative">
          <Slider
            value={renderQuality}
            onValueChange={onQualityChange}
            max={100}
            min={10}
            step={5}
            className="w-full [&_.range-track]:bg-slate-700 [&_.range-fill]:bg-cyan-500 [&_.range-thumb]:bg-cyan-400 [&_.range-thumb]:border-cyan-300"
          />
        </div>
      </div>

      {/* Field Intensity */}
      <div className="space-y-3">
        <div className="text-sm text-cyan-400 font-medium">Intensity: {fieldIntensity[0]}%</div>
        <div className="relative">
          <Slider
            value={fieldIntensity}
            onValueChange={onIntensityChange}
            max={100}
            min={0}
            step={1}
            className="w-full [&_.range-track]:bg-slate-700 [&_.range-fill]:bg-cyan-500 [&_.range-thumb]:bg-cyan-400 [&_.range-thumb]:border-cyan-300"
          />
        </div>
      </div>

      {/* Animation Controls */}
      <div className="flex gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onAnimationToggle}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
        >
          {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCameraReset}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onMetricsToggle}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
        >
          <Activity className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};