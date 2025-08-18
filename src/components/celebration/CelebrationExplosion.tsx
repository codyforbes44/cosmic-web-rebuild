import React from 'react';

interface CelebrationExplosionProps {
  isActive: boolean;
}

const CelebrationExplosion: React.FC<CelebrationExplosionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Central burst */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
        <div className="absolute top-0 left-0 w-4 h-4 bg-primary-glow rounded-full animate-pulse" />
      </div>

      {/* Explosion particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 18) * Math.PI / 180;
        const distance = 200 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const delay = Math.random() * 0.3;
        
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full opacity-80"
            style={{
              transform: `translate(-50%, -50%)`,
              animation: `celebrationParticle 1.5s ease-out ${delay}s forwards`,
              '--particle-x': `${x}px`,
              '--particle-y': `${y}px`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Sparkle effects */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 0.5;
        
        return (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-primary-glow rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: `sparkle 1.2s ease-out ${delay}s forwards`,
            }}
          />
        );
      })}

      {/* Radial burst lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rotation = i * 45;
        
        return (
          <div
            key={`burst-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-primary via-primary-glow to-transparent origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
              animation: `burstLine 1s ease-out forwards`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes celebrationParticle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes burstLine {
          0% {
            height: 0;
            opacity: 1;
          }
          50% {
            height: 80px;
            opacity: 0.8;
          }
          100% {
            height: 120px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CelebrationExplosion;