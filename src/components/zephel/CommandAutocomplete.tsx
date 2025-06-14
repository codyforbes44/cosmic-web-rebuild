import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

interface CommandAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  commands: string[];
  placeholder?: string;
  className?: string;
}

export const CommandAutocomplete: React.FC<CommandAutocompleteProps> = ({
  value,
  onChange,
  commands,
  placeholder = "Enter directive...",
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = commands.filter(cmd =>
        cmd.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [value, commands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Tab':
      case 'Enter':
        if (selectedIndex >= 0 && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          onChange(suggestions[selectedIndex]);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectSuggestion = (command: string) => {
    onChange(command);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => value.length > 0 && setSuggestions(commands.filter(cmd =>
          cmd.toLowerCase().includes(value.toLowerCase())
        ))}
        placeholder={placeholder}
        className={className}
        rows={3}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 bg-space-deep-blue border-gray-700 max-h-48 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((command, index) => (
              <button
                key={command}
                onClick={() => selectSuggestion(command)}
                className={`w-full text-left p-2 text-xs font-mono rounded border transition-colors ${
                  index === selectedIndex
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'bg-black/20 border-gray-800 text-gray-300 hover:bg-black/40 hover:border-accent/50'
                }`}
              >
                {command}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};