
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from "lucide-react";
import DemoTour from "./DemoTour";
import InteractiveDashboard from "./InteractiveDashboard";
import DemoSimulator from "./DemoSimulator";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const demoSteps = [
    {
      id: 'overview',
      title: 'Platform Overview',
      description: 'Explore our comprehensive business intelligence dashboard',
      component: 'dashboard',
      duration: 30
    },
    {
      id: 'kpis',
      title: 'Real-time KPIs',
      description: 'See how metrics update automatically with live data',
      component: 'kpis',
      duration: 45
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Dive into detailed charts and performance insights',
      component: 'analytics',
      duration: 60
    },
    {
      id: 'simulation',
      title: 'Data Simulation',
      description: 'Watch how the system responds to different scenarios',
      component: 'simulation',
      duration: 40
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < demoSteps.length) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / demoSteps[currentStep].duration);
          if (newProgress >= 100) {
            handleNextStep();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    } else {
      setIsPlaying(false);
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setCompletedSteps([]);
  };

  const renderCurrentComponent = () => {
    const step = demoSteps[currentStep];
    
    switch (step.component) {
      case 'dashboard':
        return <InteractiveDashboard />;
      case 'kpis':
        return <DemoTour step="kpis" />;
      case 'analytics':
        return <DemoTour step="analytics" />;
      case 'simulation':
        return <DemoSimulator />;
      default:
        return <InteractiveDashboard />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] bg-space-dark-blue border-orange-500/20">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DialogTitle className="text-2xl font-bold text-white">
                Interactive ƷBI Demo
              </DialogTitle>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                LIVE ENVIRONMENT
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-white">
                  {demoSteps[currentStep].title}
                </h3>
                <span className="text-gray-400">
                  Step {currentStep + 1} of {demoSteps.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Previous
                </Button>
                
                {!isPlaying ? (
                  <Button
                    size="sm"
                    onClick={handlePlay}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePause}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNextStep}
                  disabled={currentStep === demoSteps.length - 1}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Next
                </Button>
              </div>
            </div>
            
            <p className="text-gray-300 mb-3">{demoSteps[currentStep].description}</p>
            
            <div className="flex items-center space-x-4">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm text-gray-400 min-w-[60px]">
                {Math.round(progress)}%
              </span>
            </div>
            
            {/* Step indicators */}
            <div className="flex items-center space-x-2 mt-3">
              {demoSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                    index === currentStep
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : completedSteps.includes(index)
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : index === currentStep ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                  )}
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        
        {/* Demo Content */}
        <div className="flex-1 overflow-hidden">
          {renderCurrentComponent()}
        </div>
        
        {/* Demo Stats */}
        <div className="border-t border-gray-700 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <BarChart3 className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Active Metrics</p>
              <p className="text-lg font-bold text-white">12</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Demo Users</p>
              <p className="text-lg font-bold text-white">248</p>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Avg. Session</p>
              <p className="text-lg font-bold text-white">8m 32s</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
