
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import { useCalculator } from './hooks/useCalculator';

const CalculatorInterface = () => {
  const {
    display,
    history,
    isDegrees,
    handleNumberClick,
    handleOperatorClick,
    handleFunctionClick,
    handleEquals,
    handleClear,
    handleClearEntry,
    handleBackspace,
    toggleAngleMode,
    clearHistory
  } = useCalculator();

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-space-deep-blue/90 border-brand-gold/30 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-brand-gold">
            Scientific Calculator
          </CardTitle>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
            <span>Angle Mode:</span>
            <button
              onClick={toggleAngleMode}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isDegrees 
                  ? 'bg-brand-gold text-space-dark-blue' 
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              {isDegrees ? 'DEG' : 'RAD'}
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <CalculatorDisplay 
            display={display} 
            history={history}
            onClearHistory={clearHistory}
          />
          
          <CalculatorButtons
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            onFunctionClick={handleFunctionClick}
            onEquals={handleEquals}
            onClear={handleClear}
            onClearEntry={handleClearEntry}
            onBackspace={handleBackspace}
            isDegrees={isDegrees}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorInterface;
