import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import VisitorTracker from "@/components/VisitorTracker";
import CookieConsent from "@/components/CookieConsent";
import LiveChat from "@/components/LiveChat/LiveChat";
import { PageLoading } from "@/components/ui/UnifiedLoading";
import { preloadCriticalRoutes } from "@/utils/routePreloader";

// Eager loaded - critical path
import Index from "./pages/Index";

// Lazy loaded - non-critical routes
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const GetQuote = lazy(() => import("./pages/GetQuote"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Features = lazy(() => import("./pages/Features"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Partners = lazy(() => import("./pages/Partners"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Gallery = lazy(() => import("./pages/Gallery"));
const News = lazy(() => import("./pages/News"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Analytics = lazy(() => import("./pages/Analytics"));
const U2014 = lazy(() => import("./pages/U2014"));
const Planets = lazy(() => import("./pages/Planets"));
const ProjectManagement = lazy(() => import("./pages/ProjectManagement"));
const RealityRenderer = lazy(() => import("./pages/RealityRenderer"));
const Demo = lazy(() => import("./pages/Demo"));
const RecruitmentMarketing = lazy(() => import("./pages/RecruitmentMarketing"));
const DriversMatter = lazy(() => import("./pages/DriversMatter"));
const Weather = lazy(() => import("./pages/Weather"));
const ScientificCalculator = lazy(() => import("./pages/ScientificCalculator"));
const MedicalDiagnosis = lazy(() => import("./pages/MedicalDiagnosis"));
const OpenAI = lazy(() => import("./pages/OpenAI"));
const HuggingFace = lazy(() => import("./pages/HuggingFace"));
const VoiceInterface = lazy(() => import("./pages/VoiceInterface"));
const ElevenLabsEmbed = lazy(() => import("./pages/ElevenLabsEmbed"));
const Maps = lazy(() => import("./pages/Maps"));
const ChatbotProducts = lazy(() => import("./pages/ChatbotProducts"));
const SalesPresentationGenerator = lazy(() => import("./pages/SalesPresentationGenerator"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const MultiAI = lazy(() => import("./pages/MultiAI"));
const AudioReview = lazy(() => import("./pages/AudioReview"));

// Lazy loaded service pages
const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const AISolutions = lazy(() => import("./pages/AISolutions"));
const StrategyConsulting = lazy(() => import("./pages/StrategyConsulting"));
const SocialMediaManagement = lazy(() => import("./pages/SocialMediaManagement"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes cache
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

function App() {
  // Preload critical routes after initial render
  useEffect(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <ErrorBoundary 
      enableReporting 
      showDetails={import.meta.env.DEV}
    >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <VisitorTracker />
                <Suspense fallback={<PageLoading message="Loading page..." />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/get-quote" element={<GetQuote />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/case-study/:slug" element={<CaseStudy />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/demo" element={<Demo />} />
                    
                    {/* Sales Tools - Unlinked */}
                    <Route path="/sales-presentation-generator" element={<SalesPresentationGenerator />} />
                    
                    {/* Individual Service Pages */}
                    <Route path="/digital-marketing" element={<DigitalMarketing />} />
                    <Route path="/web-development" element={<WebDevelopment />} />
                    <Route path="/ai-solutions" element={<AISolutions />} />
                    <Route path="/strategy-consulting" element={<StrategyConsulting />} />
                    <Route path="/social-media-management" element={<SocialMediaManagement />} />
                    <Route path="/recruitment-marketing" element={<RecruitmentMarketing />} />
                    
                    <Route path="/drivers-matter" element={<DriversMatter />} />
                    <Route path="/u2014" element={<U2014 />} />
                    <Route path="/planets" element={<Planets />} />
                    
                    {/* Unsecured product pages */}
                    <Route path="/calculator" element={<ScientificCalculator />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/medical-diagnosis" element={<MedicalDiagnosis />} />
                    <Route path="/openai" element={<OpenAI />} />
                    <Route path="/huggingface" element={<HuggingFace />} />
                    <Route path="/voice" element={<VoiceInterface />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/elevenlabs" element={<ElevenLabsEmbed />} />
                    <Route path="/chatbot-products" element={<ChatbotProducts />} />
                    <Route path="/multi-ai" element={<MultiAI />} />
                    <Route path="/audio-review" element={<AudioReview />} />

                    {/* Protected routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/projects" element={
                      <ProtectedRoute>
                        <ProjectManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/reality" element={
                      <ProtectedRoute>
                        <RealityRenderer />
                      </ProtectedRoute>
                    } />

                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <CookieConsent />
                
                {/* Global LiveChat component - appears on all pages */}
                <LiveChat />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
