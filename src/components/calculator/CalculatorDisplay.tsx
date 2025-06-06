
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { History, X } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import CalculatorEmbed from './CalculatorEmbed';

interface CalculatorDisplayProps {
  display: string;
  history: string[];
  onClearHistory: () => void;
}

const CalculatorDisplay = ({ display, history, onClearHistory }: CalculatorDisplayProps) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="space-y-2">
      {/* Main Display */}
      <div className="bg-black/50 border border-gray-600 rounded-lg p-4 min-h-[80px] flex items-center justify-end">
        <div className="text-right w-full">
          <div className="text-white text-2xl md:text-3xl font-mono break-all">
            {display || '0'}
          </div>
        </div>
      </div>

      {/* History Toggle and Embed */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <History size={16} className="mr-1" />
            History
          </Button>
          
          <CalculatorEmbed />
        </div>
        
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Clear History
          </Button>
        )}
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-black/30 border border-gray-600 rounded-lg p-3 max-h-32">
          <ScrollArea className="h-full">
            {history.length === 0 ? (
              <p className="text-gray-400 text-sm text-center">No calculations yet</p>
            ) : (
              <div className="space-y-1">
                {history.slice(-10).reverse().map((calc, index) => (
                  <div key={index} className="text-gray-300 text-sm font-mono">
                    {calc}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default CalculatorDisplay;
