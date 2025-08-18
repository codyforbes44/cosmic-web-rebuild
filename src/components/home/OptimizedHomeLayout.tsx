import React, { memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "../Navbar";
import Footer from "../Footer";
import StarBackground from "../StarBackground";

interface OptimizedHomeLayoutProps {
  children: React.ReactNode;
}

const OptimizedHomeLayout = memo(({ children }: OptimizedHomeLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Conditionally render star background based on device performance */}
      {(!isMobile || window.innerWidth > 768) && <StarBackground />}
      
      <div className="min-h-screen relative z-10 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
});

OptimizedHomeLayout.displayName = 'OptimizedHomeLayout';

export default OptimizedHomeLayout;