
import React from "react";
import CircuitBackground from "./CircuitBackground";
import SparkAnimation from "./SparkAnimation";

interface HeroBackgroundProps {
  showSparks: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ showSparks }) => {
  return (
    <>
      <CircuitBackground />
      <SparkAnimation showSparks={showSparks} />
    </>
  );
};

export default HeroBackground;
