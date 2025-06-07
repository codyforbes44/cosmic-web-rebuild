
import { HUGGINGFACE_CONFIG } from '@/config/huggingface';

export interface HuggingFaceRequest {
  model: string;
  inputs: string | object;
  parameters?: object;
  options?: {
    wait_for_model?: boolean;
    use_cache?: boolean;
  };
}

export const buildHuggingFaceRequest = (
  model: string,
  inputs: string | object,
  options: Partial<HuggingFaceRequest> = {}
): HuggingFaceRequest => {
  return {
    model,
    inputs,
    parameters: options.parameters || {},
    options: {
      wait_for_model: true,
      use_cache: false,
      ...options.options
    }
  };
};

export const formatHuggingFaceResponse = (response: any, taskType: string): any => {
  switch (taskType) {
    case 'textGeneration':
      if (Array.isArray(response) && response[0]?.generated_text) {
        return response[0].generated_text;
      }
      break;
    case 'textClassification':
      if (Array.isArray(response)) {
        return response.map(item => ({
          label: item.label,
          score: (item.score * 100).toFixed(2) + '%'
        }));
      }
      break;
    case 'imageGeneration':
      if (response.image) {
        return response.image;
      }
      break;
    default:
      return response;
  }
  return response;
};

export const getModelsByCategory = () => {
  return {
    'Text Generation': Object.entries(HUGGINGFACE_CONFIG.textGeneration),
    'Text Classification': Object.entries(HUGGINGFACE_CONFIG.textClassification),
    'Image Generation': Object.entries(HUGGINGFACE_CONFIG.imageGeneration),
    'Image Classification': Object.entries(HUGGINGFACE_CONFIG.imageClassification),
    'Embeddings': Object.entries(HUGGINGFACE_CONFIG.embeddings),
    'Translation': Object.entries(HUGGINGFACE_CONFIG.translation)
  };
};
