// Reality Renderer Type Definitions

export interface QuantumField {
  intensity: number;
  phase: number;
  harmonics: number[];
}

export interface RenderMetrics {
  performance: number;
  complexity: number;
  accuracy: number;
}

export interface RenderStats {
  fps: number;
  triangles: number;
  drawCalls: number;
}

export interface RenderingMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export interface Construct {
  id: string;
  name: string;
  type: 'cube' | 'sphere' | 'torus' | 'complex';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metadata: {
    created: string;
    stability: number;
    quantum_signature: string;
  };
}

export interface RealityConfig {
  renderQuality: number[];
  fieldIntensity: number[];
  showMetrics: boolean;
  isAnimating: boolean;
  activeMode: string;
}

export interface ScenePreset {
  id: string;
  name: string;
  description: string;
  config: RealityConfig;
  thumbnail?: string;
}

export interface SessionSnapshot {
  id: string;
  name: string;
  timestamp: string;
  config: RealityConfig;
  isStarred: boolean;
}