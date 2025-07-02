
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import VisitorTracker from "@/components/VisitorTracker";
import CookieConsent from "@/components/CookieConsent";
import LiveChat from "@/components/LiveChat/LiveChat";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import CaseStudy from "./pages/CaseStudy";
import Partners from "./pages/Partners";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import U2014 from "./pages/U2014";
import Planets from "./pages/Planets";
import ProjectManagement from "./pages/ProjectManagement";
import RealityRenderer from "./pages/RealityRenderer";
import Demo from "./pages/Demo";
import RecruitmentMarketing from "./pages/RecruitmentMarketing";
import DriversMatter from "./pages/DriversMatter";
import Weather from "./pages/Weather";
import ScientificCalculator from "./pages/ScientificCalculator";
import MedicalDiagnosis from "./pages/MedicalDiagnosis";
import OpenAI from "./pages/OpenAI";
import HuggingFace from "./pages/HuggingFace";
import VoiceInterface from "./pages/VoiceInterface";
import ElevenLabsEmbed from "./pages/ElevenLabsEmbed";
import Maps from "./pages/Maps";
import ChatbotProducts from "./pages/ChatbotProducts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <VisitorTracker />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<GetQuote />} />
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
              <CookieConsent />
              
              {/* Global LiveChat component - appears on all pages */}
              <LiveChat />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
