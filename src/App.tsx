import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useExternalLinks } from "./hooks/use-external-links";
import { initializeTracking } from "./lib/tracking";
import PageTransition from "./components/PageTransition";
import LiveChat from "./components/chat/LiveChat";

// Import pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio"; 
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";
import Partners from "./pages/Partners";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Packages from "./pages/Packages";

// Initialize Supabase client in supabase.ts
import "./lib/supabase";

// Create a query client with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// AppContent component to use hooks inside Routes
const AppContent = () => {
  // Apply the external links hook
  useExternalLinks();
  
  // Initialize tracking when the app loads
  React.useEffect(() => {
    initializeTracking();
  }, []);
  
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/packages" element={<Packages />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LiveChat />
    </PageTransition>
  );
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
