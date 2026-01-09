import React, { useState, useCallback } from 'react';
import { ZephelPageLayout, ZephelInitializer } from '@/components/zephel/page';
import { useQuantumCommandProcessor } from '@/hooks/useQuantumCommandProcessor';
import { RealityRenderer } from '@/components/reality/RealityRenderer';
import { RealityPageHeader } from '@/components/reality/layout/RealityPageHeader';
import { RealitySidebar } from '@/components/reality/layout/RealitySidebar';
import { RealityAnalytics } from '@/components/reality/layout/RealityAnalytics';
import { ConstructDebugger } from '@/components/reality/debug/ConstructDebugger';
import { Construct, QuantumField } from '@/types/reality';
import SEO from '@/components/SEO';
import { generateVideoObjectSchema, generateSoftwareApplicationSchema } from '@/utils/seoUtils/advancedSchemas';

const RealityPage = () => {
  const [selectedConstruct, setSelectedConstruct] = useState<Construct | null>(null);
  const { quantumState } = useQuantumCommandProcessor();

  const handleConstructSelect = useCallback((construct: Construct) => {
    setSelectedConstruct(construct);
    console.log('Construct selected:', construct);
  }, []);

  const handleFullScreenToggle = useCallback((isFullScreen: boolean) => {
    console.log('Full screen:', isFullScreen);
  }, []);

  const handleSceneSelect = useCallback((scene: any) => {
    console.log('Scene selected:', scene);
  }, []);

  const handleSaveConfiguration = useCallback((name: string) => {
    console.log('Save config:', name);
  }, []);

  const handleExportScreenshot = useCallback((format: string, quality: string) => {
    console.log('Export screenshot:', format, quality);
  }, []);

  const handleExportVideo = useCallback((format: string, duration: number) => {
    console.log('Export video:', format, duration);
  }, []);

  const handleRestoreSession = useCallback((config: any) => {
    console.log('Restore session:', config);
  }, []);

  const quantumField: QuantumField = {
    intensity: quantumState.coherence,
    phase: quantumState.neural_resonance,
    harmonics: [1, 2, 3, 5, 8]
  };

  // VideoObject schema for 3D rendering exports
  const videoSchema = generateVideoObjectSchema({
    name: "ZEPHEL Reality Rendering Demo",
    description: "Interactive 3D visualization demonstration showcasing quantum field dynamics, neural network patterns, and real-time data flow rendering capabilities.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&crop=center",
    uploadDate: "2024-01-01",
    duration: "PT5M",
    embedUrl: "https://zephyel.com/reality"
  });

  // SoftwareApplication schema for the rendering engine
  const appSchema = generateSoftwareApplicationSchema({
    name: "ZEPHEL Reality Rendering Engine",
    description: "Advanced 3D visualization system with quantum field dynamics, neural network patterns, and real-time data flow rendering.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { price: "0", priceCurrency: "USD" },
    aggregateRating: { ratingValue: 4.8, reviewCount: 156 },
    featureList: [
      "Real-time 3D rendering",
      "Quantum field visualization",
      "Neural network patterns",
      "Video export capability",
      "Screenshot export",
      "Session analytics"
    ]
  });

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zephyel.com" },
      { "@type": "ListItem", "position": 2, "name": "ZEPHEL", "item": "https://zephyel.com/zephel" },
      { "@type": "ListItem", "position": 3, "name": "Reality Renderer", "item": "https://zephyel.com/reality" }
    ]
  };

  return (
    <ZephelPageLayout>
      <ZephelInitializer>
        <SEO 
          title="Advanced Reality Rendering Engine - ZEPHEL"
          description="Interactive 3D visualization system with quantum field dynamics, neural network patterns, and real-time data flow rendering. Experience the full power of ZEPHEL's reality synthesis capabilities."
          keywords="3D rendering, quantum visualization, neural networks, data visualization, reality engine, ZEPHEL"
          image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&crop=center"
          structuredData={[videoSchema, appSchema, breadcrumbSchema]}
        />
        
        <div className="space-y-6">
          <RealityPageHeader onFullScreenToggle={handleFullScreenToggle} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <RealityRenderer
                quantumField={quantumField}
                onModeChange={(mode) => console.log('Mode changed to:', mode)}
                metrics={{
                  performance: 85,
                  complexity: 70,
                  accuracy: 92
                }}
              />
            </div>
            <RealitySidebar
              onSceneSelect={handleSceneSelect}
              onSaveConfiguration={handleSaveConfiguration}
              onExportScreenshot={handleExportScreenshot}
              onExportVideo={handleExportVideo}
            />
          </div>

          <RealityAnalytics onRestoreSession={handleRestoreSession} />

          <ConstructDebugger selectedConstruct={selectedConstruct} />
        </div>
      </ZephelInitializer>
    </ZephelPageLayout>
  );
};

export default RealityPage;