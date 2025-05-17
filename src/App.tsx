
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useExternalLinks } from "./hooks/use-external-links";
import { initializeTracking } from "./lib/tracking";
import PageTransition from "./components/PageTransition";
import LiveChat from "./components/chat/LiveChat";
import { AuthProvider } from "./hooks/useAuth";
import AuthRequired from "./components/AuthRequired";
import { CalendlyProvider } from "./components/calendly/CalendlyProvider";

// Import pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Products from "./pages/Products";
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
import Auth from "./pages/Auth";

// Initialize Supabase client in supabase.ts
import "./lib/supabase";

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
        <Route path="/products" element={<Products />} />
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
        <Route path="/auth" element={<Auth />} />
        <Route path="/packages" element={<Packages />} />
        {/* Only Analytics page requires authentication */}
        <Route path="/analytics" element={
          <AuthRequired>
            <Analytics />
          </AuthRequired>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LiveChat />
    </PageTransition>
  );
};

// Create QueryClient outside of the component to avoid recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// App component
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <TooltipProvider>
            <AuthProvider>
              <CalendlyProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </CalendlyProvider>
            </AuthProvider>
          </TooltipProvider>
        </React.StrictMode>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
