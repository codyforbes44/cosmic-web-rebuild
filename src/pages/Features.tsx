
import React, { useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Settings, Users, LineChart, CloudLightning, Map, Calculator, Database, Lock, Clock, Zap } from "lucide-react";
import FeaturePreview from "@/components/features/FeaturePreview";

const Features = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  
  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
  };
  
  const handleFeatureActivate = (feature: string, requiresAuth: boolean = false) => {
    if (requiresAuth) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to activate this premium feature.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feature Activated",
      description: `The ${feature} feature has been activated.`,
      variant: "default"
    });
    
    // Navigate to the relevant page based on the feature
    if (feature === "Weather Alerts") navigate("/weather");
    else if (feature === "Interactive Maps") navigate("/maps");
    else if (feature === "Scientific Calculator") navigate("/calculator");
    else if (feature === "Analytics Dashboard") navigate("/analytics");
  };
  
  return (
    <>
      <SEO 
        title="Advanced Features | Ʒʙɪ Tools" 
        description="Discover and activate powerful additional features for your Ʒʙɪ Tools experience. Enhance productivity with smart tools and integrations."
        keywords="features, tools, business solutions, data integration, analytics, Ʒʙɪ tools"
        image="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png"
        type="website"
      />
      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <BreadcrumbNav currentPageLabel="Features" />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Advanced Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enhance your experience with powerful add-on features designed to boost productivity and unlock new capabilities.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="bg-space-deep-blue/50 border border-gray-700">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="data">Data & Analytics</TabsTrigger>
              <TabsTrigger value="integration">Integrations</TabsTrigger>
              <TabsTrigger value="premium" className="relative">
                Premium
                <Badge variant="outline" className="ml-2 bg-brand-gold text-black text-xs absolute -top-2 -right-2">
                  PRO
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weather Alerts Feature Card */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Weather Alerts")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <CloudLightning className="h-8 w-8 text-blue-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Weather Alerts</CardTitle>
                    <CardDescription className="text-gray-400">
                      Real-time notifications for severe weather conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Get instant alerts about weather changes and dangerous conditions for your saved locations.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-blue-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Weather Alerts");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Interactive Maps Feature */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Interactive Maps")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Map className="h-8 w-8 text-green-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Interactive Maps</CardTitle>
                    <CardDescription className="text-gray-400">
                      Advanced mapping with real-time traffic data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Explore locations with detailed maps, route planning, and points of interest.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-green-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Interactive Maps");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Scientific Calculator */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Scientific Calculator")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Calculator className="h-8 w-8 text-purple-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Scientific Calculator</CardTitle>
                    <CardDescription className="text-gray-400">
                      Advanced calculations for professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Perform complex mathematical operations with our feature-rich scientific calculator.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-purple-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Scientific Calculator");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Analytics Dashboard */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Analytics Dashboard")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <LineChart className="h-8 w-8 text-orange-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Analytics Dashboard</CardTitle>
                    <CardDescription className="text-gray-400">
                      Comprehensive data insights for your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Visualize and analyze your business data with customizable charts and reports.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-orange-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Analytics Dashboard");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* User Accounts */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("User Accounts")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Users className="h-8 w-8 text-cyan-400" />
                      <Badge className="bg-amber-700 hover:bg-amber-600">Coming Soon</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">User Accounts</CardTitle>
                    <CardDescription className="text-gray-400">
                      Personalized experiences across devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Create an account to save your preferences, history, and access personalized features.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-cyan-900/30 hover:text-white"
                      disabled
                    >
                      Coming Soon <Clock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Custom API Access */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Custom API Access")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Database className="h-8 w-8 text-red-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Custom API Access</CardTitle>
                    <CardDescription className="text-gray-400">
                      Connect your systems to our data platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Integrate our tools and data with your own systems through secure API endpoints.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Custom API Access", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* AI Assistant */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("AI Assistant")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Zap className="h-8 w-8 text-yellow-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">AI Assistant</CardTitle>
                    <CardDescription className="text-gray-400">
                      Intelligent help across all platform tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Get contextual assistance and intelligent suggestions as you work with our platform tools.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-yellow-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("AI Assistant", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Advanced Settings */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Advanced Settings")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Settings className="h-8 w-8 text-indigo-400" />
                      <Badge className="bg-amber-700 hover:bg-amber-600">Coming Soon</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Advanced Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize your experience with advanced options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Fine-tune how tools work with detailed configuration options and preferences.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-indigo-900/30 hover:text-white"
                      disabled
                    >
                      Coming Soon <Clock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="productivity" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Scientific Calculator */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Scientific Calculator")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Calculator className="h-8 w-8 text-purple-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Scientific Calculator</CardTitle>
                    <CardDescription className="text-gray-400">
                      Advanced calculations for professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Perform complex mathematical operations with our feature-rich scientific calculator.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-purple-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Scientific Calculator");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* AI Assistant */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("AI Assistant")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Zap className="h-8 w-8 text-yellow-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">AI Assistant</CardTitle>
                    <CardDescription className="text-gray-400">
                      Intelligent help across all platform tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Get contextual assistance and intelligent suggestions as you work with our platform tools.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-yellow-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("AI Assistant", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Analytics Dashboard */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Analytics Dashboard")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <LineChart className="h-8 w-8 text-orange-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Analytics Dashboard</CardTitle>
                    <CardDescription className="text-gray-400">
                      Comprehensive data insights for your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Visualize and analyze your business data with customizable charts and reports.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-orange-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Analytics Dashboard");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Custom API Access */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Custom API Access")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Database className="h-8 w-8 text-red-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Custom API Access</CardTitle>
                    <CardDescription className="text-gray-400">
                      Connect your systems to our data platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Integrate our tools and data with your own systems through secure API endpoints.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Custom API Access", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weather Alerts Feature Card */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Weather Alerts")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <CloudLightning className="h-8 w-8 text-blue-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Weather Alerts</CardTitle>
                    <CardDescription className="text-gray-400">
                      Real-time notifications for severe weather conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Get instant alerts about weather changes and dangerous conditions for your saved locations.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-blue-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Weather Alerts");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Interactive Maps Feature */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Interactive Maps")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Map className="h-8 w-8 text-green-400" />
                      <Badge>Available Now</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Interactive Maps</CardTitle>
                    <CardDescription className="text-gray-400">
                      Advanced mapping with real-time traffic data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Explore locations with detailed maps, route planning, and points of interest.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-green-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Interactive Maps");
                      }}
                    >
                      Activate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="premium" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Custom API Access */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("Custom API Access")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Database className="h-8 w-8 text-red-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">Custom API Access</CardTitle>
                    <CardDescription className="text-gray-400">
                      Connect your systems to our data platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Integrate our tools and data with your own systems through secure API endpoints.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("Custom API Access", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* AI Assistant */}
                <Card className="bg-space-deep-blue/80 border-gray-700 hover:border-brand-gold/50 transition-all cursor-pointer"
                      onClick={() => handleFeatureSelect("AI Assistant")}>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Zap className="h-8 w-8 text-yellow-400" />
                      <Badge className="bg-brand-gold text-black">Premium</Badge>
                    </div>
                    <CardTitle className="text-xl text-white">AI Assistant</CardTitle>
                    <CardDescription className="text-gray-400">
                      Intelligent help across all platform tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Get contextual assistance and intelligent suggestions as you work with our platform tools.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-yellow-900/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureActivate("AI Assistant", true);
                      }}
                    >
                      Premium Feature <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Feature Preview Section */}
          {selectedFeature && (
            <FeaturePreview 
              featureName={selectedFeature} 
              onActivate={handleFeatureActivate}
            />
          )}
          
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Features;
