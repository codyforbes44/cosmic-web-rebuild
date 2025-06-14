import { useCallback, useRef } from 'react';

interface SoundConfig {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
}

export const useZephelSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((config: SoundConfig) => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = config.frequency;
      oscillator.type = config.type || 'sine';
      gainNode.gain.value = config.volume || 0.3;

      oscillator.start();
      oscillator.stop(audioContext.currentTime + config.duration / 1000);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [getAudioContext]);

  const playSystemBoot = useCallback(() => {
    const frequencies = [220, 330, 440, 550];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone({ frequency: freq, duration: 150, type: 'square', volume: 0.2 });
      }, index * 100);
    });
  }, [playTone]);

  const playCommandExecute = useCallback(() => {
    playTone({ frequency: 800, duration: 50, type: 'sawtooth', volume: 0.15 });
    setTimeout(() => {
      playTone({ frequency: 600, duration: 50, type: 'sawtooth', volume: 0.15 });
    }, 60);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone({ frequency: 150, duration: 300, type: 'square', volume: 0.25 });
  }, [playTone]);

  const playSuccess = useCallback(() => {
    const frequencies = [440, 554, 659];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone({ frequency: freq, duration: 100, type: 'triangle', volume: 0.2 });
      }, index * 50);
    });
  }, [playTone]);

  const playTyping = useCallback(() => {
    const freq = 1000 + Math.random() * 200;
    playTone({ frequency: freq, duration: 20, type: 'square', volume: 0.05 });
  }, [playTone]);

  const playNotification = useCallback(() => {
    playTone({ frequency: 1000, duration: 100, type: 'sine', volume: 0.2 });
    setTimeout(() => {
      playTone({ frequency: 1200, duration: 100, type: 'sine', volume: 0.2 });
    }, 120);
  }, [playTone]);

  return {
    playSystemBoot,
    playCommandExecute,
    playError,
    playSuccess,
    playTyping,
    playNotification,
    playTone
  };
};