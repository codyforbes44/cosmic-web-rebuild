import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-accent"></div>
    </div>
  );
};

export default LoadingSpinner;