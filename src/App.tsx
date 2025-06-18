
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import CookieConsent from "./components/CookieConsent";
import LiveChat from "./components/LiveChat/LiveChat";
import VisitorTracker from "./components/VisitorTracker";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const News = lazy(() => import("./pages/News"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const GetQuote = lazy(() => import("./pages/GetQuote"));
const Partners = lazy(() => import("./pages/Partners"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Analytics = lazy(() => import("./pages/Analytics"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RecruitmentMarketing = lazy(() => import("./pages/RecruitmentMarketing"));
const DriversMatter = lazy(() => import("./pages/DriversMatter"));
const Weather = lazy(() => import("./pages/Weather"));
const Maps = lazy(() => import("./pages/Maps"));
const MedicalDiagnosis = lazy(() => import("./pages/MedicalDiagnosis"));
const ScientificCalculator = lazy(() => import("./pages/ScientificCalculator"));
const Features = lazy(() => import("./pages/Features"));
const OpenAI = lazy(() => import("./pages/OpenAI"));
const HuggingFace = lazy(() => import("./pages/HuggingFace"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProjectManagement = lazy(() => import("./pages/ProjectManagement"));
const Demo = lazy(() => import("./pages/Demo"));

// U2014 page
const U2014 = lazy(() => import("./pages/U2014"));
import RealityRenderer from "./pages/RealityRenderer";

// Auth pages
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen bg-space-dark-blue flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

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

// Scroll to top on route change - MOVED INSIDE BrowserRouter
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // If hash is present, let the browser handle the scroll
    if (hash) {
      // Use a small timeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    } else {
      // No hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  
  return null;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/services" element={<Services />} />
      <Route path="/recruitment-marketing" element={<RecruitmentMarketing />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/case-study/:id" element={<CaseStudy />} />
      <Route path="/news" element={<News />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/get-quote" element={<GetQuote />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/demo" element={<Demo />} />
      
      {/* Protected routes - require authentication */}
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectManagement /></ProtectedRoute>} />
      <Route path="/openai" element={<ProtectedRoute><OpenAI /></ProtectedRoute>} />
      <Route path="/huggingface" element={<ProtectedRoute><HuggingFace /></ProtectedRoute>} />
      <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
      <Route path="/medical-diagnosis" element={<ProtectedRoute><MedicalDiagnosis /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
      <Route path="/calculator" element={<ProtectedRoute><ScientificCalculator /></ProtectedRoute>} />
      
      {/* Public routes */}
      <Route path="/maps" element={<Maps />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/drivers-matter" element={<DriversMatter />} />
      
      {/* U2014 route */}
      <Route path="/u2014" element={<U2014 />} />
      <Route path="/reality-renderer" element={<RealityRenderer />} />
      
      {/* Catch-all route for 404 - MUST be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const ConditionalLiveChat = () => {
  const location = useLocation();
  
  // Hide chatbot on reality-renderer page
  if (location.pathname === '/reality-renderer') {
    return null;
  }
  
  return <LiveChat />;
};

const ConditionalCookieConsent = () => {
  return <CookieConsent />;
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
              <AuthProvider>
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <AppRoutes />
                  <VisitorTracker />
                </Suspense>
                <ConditionalLiveChat />
                <ConditionalCookieConsent />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
