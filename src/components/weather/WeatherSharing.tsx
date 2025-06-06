
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Download } from 'lucide-react';
import { WeatherData } from '@/components/footer/weather/WeatherService';
import { useToast } from "@/hooks/use-toast";

interface WeatherSharingProps {
  weatherData: WeatherData;
  units: 'imperial' | 'metric';
}

const WeatherSharing = ({ weatherData, units }: WeatherSharingProps) => {
  const { toast } = useToast();

  const shareText = `Current weather in ${weatherData.location}: ${weatherData.temperature}°${units === 'imperial' ? 'F' : 'C'}, ${weatherData.condition}. Feels like ${weatherData.feelsLike}°${units === 'imperial' ? 'F' : 'C'}`;

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = shareText;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast({
          title: "Copied to clipboard",
          description: "Weather information has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Unable to copy to clipboard.",
          variant: "destructive",
        });
      }
    } else if (platform === 'native') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Weather Update',
            text: text,
            url: url,
          });
        } catch (err) {
          console.log('Share cancelled');
        }
      }
    }
  };

  const generateWeatherWidget = () => {
    const widgetCode = `<iframe src="${window.location.origin}/weather?widget=true" width="300" height="200" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(widgetCode);
    toast({
      title: "Widget code copied",
      description: "Weather widget embed code has been copied to your clipboard.",
    });
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="bg-blue-500/20 border-blue-500/50 text-white hover:bg-blue-500/30"
          >
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="bg-blue-600/20 border-blue-600/50 text-white hover:bg-blue-600/30"
          >
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('copy')}
            className="bg-gray-500/20 border-gray-500/50 text-white hover:bg-gray-500/30"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('native')}
              className="bg-green-500/20 border-green-500/50 text-white hover:bg-green-500/30"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>

        <div className="pt-3 border-t border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={generateWeatherWidget}
            className="w-full bg-purple-500/20 border-purple-500/50 text-white hover:bg-purple-500/30"
          >
            <Download className="w-4 h-4 mr-2" />
            Get Widget Code
          </Button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Embed this weather widget on your website
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSharing;
