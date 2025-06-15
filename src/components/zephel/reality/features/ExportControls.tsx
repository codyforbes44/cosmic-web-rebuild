import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Save, 
  Camera, 
  Video, 
  FileImage,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportControlsProps {
  onSaveConfiguration: (name: string) => void;
  onExportScreenshot: (format: string, quality: string) => void;
  onExportVideo: (format: string, duration: number) => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  onSaveConfiguration,
  onExportScreenshot,
  onExportVideo
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    const configName = `Config_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`;
    onSaveConfiguration(configName);
    toast({
      title: "Configuration Saved",
      description: `Saved as ${configName}`,
    });
  };

  const handleScreenshot = async (format: string = 'png', quality: string = 'high') => {
    setIsExporting(true);
    try {
      await onExportScreenshot(format, quality);
      toast({
        title: "Screenshot Exported",
        description: `High-resolution ${format.toUpperCase()} image saved`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export screenshot",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleVideoExport = async (format: string = 'mp4', duration: number = 10) => {
    setIsExporting(true);
    try {
      await onExportVideo(format, duration);
      toast({
        title: "Video Export Started",
        description: `Recording ${duration}s ${format.toUpperCase()} video...`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not start video recording",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="bg-slate-900/95 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 text-sm flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export & Save
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Save Configuration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Configuration</span>
            <Badge variant="outline" className="text-xs text-cyan-300 border-cyan-500/30">
              JSON
            </Badge>
          </div>
          <Button
            size="sm"
            onClick={handleSaveConfig}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
            disabled={isExporting}
          >
            <Save className="w-3 h-3 mr-2" />
            Save Current Setup
          </Button>
        </div>

        {/* Screenshot Export */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Screenshot</span>
            <Badge variant="outline" className="text-xs text-green-300 border-green-500/30">
              PNG/JPG
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue="png">
              <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="high">
              <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (1x)</SelectItem>
                <SelectItem value="medium">Medium (2x)</SelectItem>
                <SelectItem value="high">High (4x)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            size="sm"
            onClick={() => handleScreenshot('png', 'high')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
            disabled={isExporting}
          >
            <Camera className="w-3 h-3 mr-2" />
            {isExporting ? 'Capturing...' : 'Capture Screenshot'}
          </Button>
        </div>

        {/* Video Export */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Video Recording</span>
            <Badge variant="outline" className="text-xs text-purple-300 border-purple-500/30">
              MP4/WebM
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue="mp4">
              <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp4">MP4</SelectItem>
                <SelectItem value="webm">WebM</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="10">
              <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 seconds</SelectItem>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            size="sm"
            onClick={() => handleVideoExport('mp4', 10)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
            disabled={isExporting}
          >
            <Video className="w-3 h-3 mr-2" />
            {isExporting ? 'Recording...' : 'Record Video'}
          </Button>
        </div>

        {/* Export Status */}
        {isExporting && (
          <div className="mt-3 p-2 bg-blue-500/20 border border-blue-500/30 rounded text-center">
            <div className="text-blue-300 text-xs">
              Export in progress...
            </div>
            <div className="w-full bg-blue-500/20 rounded-full h-1 mt-1">
              <div className="bg-blue-500 h-1 rounded-full animate-pulse w-1/2"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};