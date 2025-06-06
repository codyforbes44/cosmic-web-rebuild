
import { useState, useCallback } from 'react';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [isDegrees, setIsDegrees] = useState(true);

  const addToHistory = useCallback((calculation: string) => {
    setHistory(prev => [...prev, calculation]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const toRadians = useCallback((degrees: number) => {
    return degrees * (Math.PI / 180);
  }, []);

  const toDegrees = useCallback((radians: number) => {
    return radians * (180 / Math.PI);
  }, []);

  const handleNumberClick = useCallback((num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForNewValue]);

  const handleOperatorClick = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation, addToHistory]);

  const calculate = useCallback((firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  }, []);

  const handleFunctionClick = useCallback((func: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    try {
      switch (func) {
        case 'sin':
          result = Math.sin(isDegrees ? toRadians(inputValue) : inputValue);
          break;
        case 'cos':
          result = Math.cos(isDegrees ? toRadians(inputValue) : inputValue);
          break;
        case 'tan':
          result = Math.tan(isDegrees ? toRadians(inputValue) : inputValue);
          break;
        case 'asin':
          result = Math.asin(inputValue);
          result = isDegrees ? toDegrees(result) : result;
          break;
        case 'acos':
          result = Math.acos(inputValue);
          result = isDegrees ? toDegrees(result) : result;
          break;
        case 'atan':
          result = Math.atan(inputValue);
          result = isDegrees ? toDegrees(result) : result;
          break;
        case 'ln':
          result = Math.log(inputValue);
          break;
        case 'log':
          result = Math.log10(inputValue);
          break;
        case 'sqrt':
          result = Math.sqrt(inputValue);
          break;
        case 'square':
          result = inputValue * inputValue;
          break;
        case 'cube':
          result = inputValue * inputValue * inputValue;
          break;
        case 'factorial':
          result = factorial(inputValue);
          break;
        case '1/x':
          result = inputValue !== 0 ? 1 / inputValue : 0;
          break;
        case 'abs':
          result = Math.abs(inputValue);
          break;
        case 'exp':
          result = Math.exp(inputValue);
          break;
        case 'pow10':
          result = Math.pow(10, inputValue);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case 'pow':
          // This will be handled differently - needs two operands
          setOperation('pow');
          setPreviousValue(inputValue);
          setWaitingForNewValue(true);
          return;
        default:
          result = inputValue;
      }

      const calculation = `${func}(${inputValue}) = ${result}`;
      addToHistory(calculation);
      setDisplay(String(result));
      setWaitingForNewValue(true);
    } catch (error) {
      setDisplay('Error');
      setWaitingForNewValue(true);
    }
  }, [display, isDegrees, toRadians, toDegrees, addToHistory]);

  const factorial = useCallback((n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }, []);

  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let newValue: number;
      
      if (operation === 'pow') {
        newValue = Math.pow(previousValue, inputValue);
      } else {
        newValue = calculate(previousValue, inputValue, operation);
      }

      const calculation = `${previousValue} ${operation === 'pow' ? '^' : operation} ${inputValue} = ${newValue}`;
      addToHistory(calculation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }, [display, previousValue, operation, calculate, addToHistory]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  }, []);

  const handleClearEntry = useCallback(() => {
    setDisplay('0');
    setWaitingForNewValue(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const toggleAngleMode = useCallback(() => {
    setIsDegrees(!isDegrees);
  }, [isDegrees]);

  return {
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
  };
};
