import { WeatherResponse } from './types';
import { supabase } from '@/integrations/supabase/client';

export const fetchOpenAIWeather = async (units: 'imperial' | 'metric'): Promise<WeatherResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-weather', {
      body: { units }
    });

    if (error) {
      throw new Error(`Failed to generate weather: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('OpenAI weather generation failed:', err);
    throw err;
  }
};