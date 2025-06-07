
export const HUGGINGFACE_CONFIG = {
  // Text Generation Models
  textGeneration: {
    gpt2: 'gpt2',
    distilgpt2: 'distilgpt2',
    flan_t5_small: 'google/flan-t5-small',
    flan_t5_base: 'google/flan-t5-base'
  },
  
  // Text Classification Models
  textClassification: {
    sentiment: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
    emotion: 'j-hartmann/emotion-english-distilroberta-base',
    spam: 'microsoft/DialoGPT-medium'
  },
  
  // Image Generation Models
  imageGeneration: {
    stable_diffusion: 'runwayml/stable-diffusion-v1-5',
    stable_diffusion_xl: 'stabilityai/stable-diffusion-xl-base-1.0',
    dalle_mini: 'dalle-mini/dalle-mini'
  },
  
  // Image Classification Models
  imageClassification: {
    resnet: 'microsoft/resnet-50',
    vit: 'google/vit-base-patch16-224'
  },
  
  // Embedding Models
  embeddings: {
    sentence_transformer: 'sentence-transformers/all-MiniLM-L6-v2',
    bert: 'bert-base-uncased'
  },
  
  // Translation Models
  translation: {
    en_to_fr: 'Helsinki-NLP/opus-mt-en-fr',
    en_to_es: 'Helsinki-NLP/opus-mt-en-es',
    en_to_de: 'Helsinki-NLP/opus-mt-en-de'
  }
} as const;

export type HuggingFaceModel = typeof HUGGINGFACE_CONFIG[keyof typeof HUGGINGFACE_CONFIG][keyof typeof HUGGINGFACE_CONFIG[keyof typeof HUGGINGFACE_CONFIG]];
