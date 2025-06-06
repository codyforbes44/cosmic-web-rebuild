
import React from 'react';
import { Button } from "@/components/ui/button";

interface CalculatorButtonsProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onFunctionClick: (func: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  isDegrees: boolean;
}

const CalculatorButtons = ({
  onNumberClick,
  onOperatorClick,
  onFunctionClick,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  isDegrees
}: CalculatorButtonsProps) => {
  const buttonClass = "h-12 text-sm font-medium transition-all hover:scale-105";
  const numberClass = `${buttonClass} bg-gray-700 hover:bg-gray-600 text-white border-gray-600`;
  const operatorClass = `${buttonClass} bg-brand-gold hover:bg-brand-gold/80 text-space-dark-blue border-brand-gold`;
  const functionClass = `${buttonClass} bg-blue-600 hover:bg-blue-500 text-white border-blue-500`;
  const clearClass = `${buttonClass} bg-red-600 hover:bg-red-500 text-white border-red-500`;

  return (
    <div className="grid grid-cols-6 gap-2">
      {/* Row 1 - Scientific Functions */}
      <Button className={functionClass} onClick={() => onFunctionClick('sin')}>sin</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('cos')}>cos</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('tan')}>tan</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('ln')}>ln</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('log')}>log</Button>
      <Button className={clearClass} onClick={onClear}>AC</Button>

      {/* Row 2 - More Functions */}
      <Button className={functionClass} onClick={() => onFunctionClick('asin')}>sin⁻¹</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('acos')}>cos⁻¹</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('atan')}>tan⁻¹</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('sqrt')}>√</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('pow')}>xʸ</Button>
      <Button className={clearClass} onClick={onClearEntry}>CE</Button>

      {/* Row 3 - Constants and Functions */}
      <Button className={functionClass} onClick={() => onFunctionClick('pi')}>π</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('e')}>e</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('factorial')}>x!</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('square')}>x²</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('cube')}>x³</Button>
      <Button className={operatorClass} onClick={onBackspace}>⌫</Button>

      {/* Row 4 - Numbers and Operators */}
      <Button className={numberClass} onClick={() => onNumberClick('7')}>7</Button>
      <Button className={numberClass} onClick={() => onNumberClick('8')}>8</Button>
      <Button className={numberClass} onClick={() => onNumberClick('9')}>9</Button>
      <Button className={operatorClass} onClick={() => onOperatorClick('/')}>/</Button>
      <Button className={functionClass} onClick={() => onNumberClick('(')}>(</Button>
      <Button className={functionClass} onClick={() => onNumberClick(')')}>)</Button>

      {/* Row 5 */}
      <Button className={numberClass} onClick={() => onNumberClick('4')}>4</Button>
      <Button className={numberClass} onClick={() => onNumberClick('5')}>5</Button>
      <Button className={numberClass} onClick={() => onNumberClick('6')}>6</Button>
      <Button className={operatorClass} onClick={() => onOperatorClick('*')}>×</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('1/x')}>1/x</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('abs')}>|x|</Button>

      {/* Row 6 */}
      <Button className={numberClass} onClick={() => onNumberClick('1')}>1</Button>
      <Button className={numberClass} onClick={() => onNumberClick('2')}>2</Button>
      <Button className={numberClass} onClick={() => onNumberClick('3')}>3</Button>
      <Button className={operatorClass} onClick={() => onOperatorClick('-')}>-</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('exp')}>eˣ</Button>
      <Button className={functionClass} onClick={() => onFunctionClick('pow10')}>10ˣ</Button>

      {/* Row 7 */}
      <Button className={`${numberClass} col-span-2`} onClick={() => onNumberClick('0')}>0</Button>
      <Button className={numberClass} onClick={() => onNumberClick('.')}>.</Button>
      <Button className={operatorClass} onClick={() => onOperatorClick('+')}>+</Button>
      <Button className={`${operatorClass} col-span-2`} onClick={onEquals}>=</Button>
    </div>
  );
};

export default CalculatorButtons;
