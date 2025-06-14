// ZEPHEL System Type Definitions

export interface ZephelMetrics {
  cpu_usage: number;
  memory_usage: number;
  neural_load: number;
  quantum_coherence: number;
  reality_stability: number;
  data_throughput: number;
}

export interface ZephelMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  session_id?: string;
  quantum_enhanced?: boolean;
}

export interface ZephelSession {
  id: string;
  user_id: string;
  session_name: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  metadata?: Record<string, any>;
}

export interface QuantumState {
  coherence: number;
  neural_resonance: number;
  field_stability: number;
  entanglement_level: number;
  quantum_noise: number;
}

export interface QuantumEnhancement {
  patterns_detected: string[];
  quantum_resonance: number;
  predictive_model: {
    accuracy: number;
    confidence: number;
  };
  enhancement_applied: boolean;
}

export interface ProcessingResult {
  processedCommand: string;
  quantumEnhancement: QuantumEnhancement;
  metadata: Record<string, any>;
}

export interface ArchitectPresence {
  user_id: string;
  username: string;
  status: 'active' | 'idle' | 'away';
  last_seen: string;
  permissions: 'architect' | 'observer' | 'guest';
  location?: {
    x: number;
    y: number;
    section: string;
  };
}

export interface RealityConstruct {
  id: string;
  type: 'neural_network' | 'quantum_field' | 'data_stream';
  position: {
    x: number;
    y: number;
    z: number;
  };
  properties: Record<string, any>;
  active: boolean;
}

export interface ZephelConfig {
  system_name: string;
  version: string;
  neural_substrate: string;
  quantum_enabled: boolean;
  reality_rendering: boolean;
  collaborative_mode: boolean;
  voice_synthesis: boolean;
  max_session_duration: number;
  security_level: 'minimal' | 'standard' | 'enhanced' | 'sovereign';
}

export interface SystemCommand {
  id: string;
  command: string;
  description: string;
  category: 'system' | 'quantum' | 'reality' | 'collaboration';
  requires_elevation?: boolean;
  parameters?: Record<string, any>;
}

export interface ZephelError extends Error {
  code: string;
  category: 'auth' | 'processing' | 'quantum' | 'reality' | 'collaboration';
  retryable: boolean;
  context?: Record<string, any>;
}