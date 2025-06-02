
import { WifiOff, Signal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeatherErrorProps {
  error: string;
}

const WeatherError = ({ error }: WeatherErrorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <WifiOff size={18} className="text-amber-400" />
            <Signal size={18} className="text-amber-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-gray-100 border-gray-700">
          <p>{error}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WeatherError;
