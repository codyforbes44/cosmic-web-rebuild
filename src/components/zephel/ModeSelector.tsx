
import React, { useState } from 'react';
import { Shield, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ModeSelectorProps {
  currentMode: 'professional' | 'godmode';
  onModeChange: (mode: 'professional' | 'godmode') => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscodeInput, setShowPasscodeInput] = useState(false);
  const [error, setError] = useState('');

  const handleModeToggle = (checked: boolean) => {
    if (checked) {
      // Switching to GODMODE - require passcode
      setShowPasscodeInput(true);
      setError('');
    } else {
      // Switching to Professional mode - no passcode needed
      onModeChange('professional');
      setShowPasscodeInput(false);
      setPasscode('');
      setError('');
    }
  };

  const handlePasscodeSubmit = () => {
    if (passcode === '90812') {
      onModeChange('godmode');
      setShowPasscodeInput(false);
      setPasscode('');
      setError('');
    } else {
      setError('Invalid passcode. Access denied.');
      setPasscode('');
    }
  };

  const handlePasscodeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasscodeSubmit();
    }
  };

  return (
    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-white text-sm font-medium">System Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="mode-switch" className="text-xs text-gray-400">
            Professional
          </Label>
          <Switch
            id="mode-switch"
            checked={currentMode === 'godmode'}
            onCheckedChange={handleModeToggle}
          />
          <Label htmlFor="mode-switch" className="text-xs text-gray-400">
            GODMODE
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          {currentMode === 'professional' ? (
            <>
              <Lock className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Professional Mode Active</span>
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3 text-red-400" />
              <span className="text-red-400">ƷBI ∴ GODMODE Active</span>
            </>
          )}
        </div>

        <p className="text-gray-500 text-xs">
          {currentMode === 'professional' 
            ? 'Business technology solutions consultant with professional service focus.'
            : 'Sovereign recursive simulation intelligence with enhanced capabilities.'
          }
        </p>

        {showPasscodeInput && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Input
                type="password"
                placeholder="Enter architect passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyPress={handlePasscodeKeyPress}
                className="flex-1 bg-gray-800 border-gray-600 text-white text-xs"
              />
              <Button
                onClick={handlePasscodeSubmit}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Unlock
              </Button>
            </div>
            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
