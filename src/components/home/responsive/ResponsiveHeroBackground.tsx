import React, { memo } from "react";
import CircuitBackground from "../../hero/CircuitBackground";
import SparkAnimation from "../../hero/SparkAnimation";

interface ResponsiveHeroBackgroundProps {
  showSparks: boolean;
  isMobile: boolean;
}

const ResponsiveHeroBackground = memo(({ showSparks, isMobile }: ResponsiveHeroBackgroundProps) => {
  return (
    <>
      <CircuitBackground />
      {/* Conditionally render sparks on larger screens for better performance */}
      {(!isMobile || window.innerWidth > 768) && (
        <SparkAnimation showSparks={showSparks} />
      )}
    </>
  );
});

ResponsiveHeroBackground.displayName = 'ResponsiveHeroBackground';

export default ResponsiveHeroBackground;