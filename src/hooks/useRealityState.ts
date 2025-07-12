import { useState, useCallback, useEffect } from 'react';
import { RealityConfig, RenderStats } from '@/types/reality';

interface UseRealityStateReturn {
  config: RealityConfig;
  renderStats: RenderStats;
  updateConfig: (updates: Partial<RealityConfig>) => void;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: RealityConfig = {
  renderQuality: [75],
  fieldIntensity: [50],
  showMetrics: true,
  isAnimating: true,
  activeMode: 'quantum'
};

export const useRealityState = (initialConfig?: Partial<RealityConfig>): UseRealityStateReturn => {
  const [config, setConfig] = useState<RealityConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig
  });

  const [renderStats, setRenderStats] = useState<RenderStats>({
    fps: 60,
    triangles: 0,
    drawCalls: 0
  });

  const updateConfig = useCallback((updates: Partial<RealityConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  // Simulate render stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRenderStats({
        fps: Math.floor(Math.random() * 10) + 55,
        triangles: Math.floor(Math.random() * 50000) + 100000,
        drawCalls: Math.floor(Math.random() * 100) + 200
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    config,
    renderStats,
    updateConfig,
    resetConfig
  };
};