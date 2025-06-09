
export const fetchWeatherAlerts = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    if (response.ok) {
      const data = await response.json();
      return data.alerts?.map((alert: any) => ({
        id: alert.event,
        title: alert.event,
        description: alert.description,
        severity: 'moderate',
        expires: new Date(alert.end * 1000).toLocaleString()
      })) || [];
    }
  } catch (err) {
    console.warn('Weather alerts unavailable:', err);
  }
  return [];
};
