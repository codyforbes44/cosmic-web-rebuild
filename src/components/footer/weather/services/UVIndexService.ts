
export const fetchUVIndex = async (lat: number, lon: number): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    if (response.ok) {
      const data = await response.json();
      return Math.round(data.value || 0);
    }
  } catch (err) {
    console.warn('UV Index unavailable:', err);
  }
  return 5; // Default moderate UV
};
