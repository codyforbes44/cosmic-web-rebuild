import React from 'react';
import { PresetScenes } from '@/components/zephel/reality/features/PresetScenes';
import { ExportControls } from '@/components/zephel/reality/features/ExportControls';

interface RealitySidebarProps {
  onSceneSelect?: (scene: any) => void;
  onSaveConfiguration?: (name: string) => void;
  onExportScreenshot?: (format: string, quality: string) => void;
  onExportVideo?: (format: string, duration: number) => void;
}

export const RealitySidebar: React.FC<RealitySidebarProps> = ({
  onSceneSelect,
  onSaveConfiguration,
  onExportScreenshot,
  onExportVideo
}) => {
  return (
    <div className="space-y-4">
      <PresetScenes 
        onSceneSelect={onSceneSelect || ((scene) => console.log('Scene selected:', scene))} 
      />
      <ExportControls 
        onSaveConfiguration={onSaveConfiguration || ((name) => console.log('Save config:', name))}
        onExportScreenshot={onExportScreenshot || ((format, quality) => console.log('Export screenshot:', format, quality))}
        onExportVideo={onExportVideo || ((format, duration) => console.log('Export video:', format, duration))}
      />
    </div>
  );
};