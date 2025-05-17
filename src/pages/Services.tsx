
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: 'custom-software',
    name: 'Custom Software',
    description: 'Tailored software solutions designed and developed to address your unique business challenges.',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#E11D48',
    deliverables: 'Custom applications, API integrations, User documentation',
    duration: '2-9 months',
    process: 'Requirements, Design, Development, Testing, Deployment',
    key_benefit: 'Purpose-built software that perfectly addresses your specific business requirements'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Transform your data into actionable insights with advanced analytics and visualization solutions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#059669',
    deliverables: 'Dashboards, Reports, Data models, KPI tracking',
    duration: '1-3 months',
    process: 'Data Assessment, Platform Setup, Dashboard Creation, Training',
    key_benefit: 'Make data-driven decisions with real-time insights into your business operations'
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    description: 'End-to-end cloud migration and management services to modernize your IT infrastructure and improve scalability.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#2563EB',
    deliverables: 'Cloud architecture, Migration roadmap, Managed services',
    duration: '2-6 months',
    process: 'Assessment, Planning, Migration, Optimization, Management',
    key_benefit: 'Increase operational agility and reduce infrastructure costs with modern cloud solutions'
  },
  {
    id: 'it-consulting',
    name: 'IT Consulting',
    description: 'Strategic technology advisory services to align your IT investments with your business objectives.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#7C3AED',
    deliverables: 'Technology roadmap, Gap analysis, ROI projections',
    duration: '4-8 weeks',
    process: 'Assessment, Analysis, Strategy Development, Implementation Planning',
    key_benefit: 'Align technology investments with business goals to maximize ROI and competitive advantage'
  },
  {
    id: 'managed-services',
    name: 'Managed Services',
    description: 'Comprehensive IT support and management services to ensure your systems run smoothly and securely.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#F59E0B',
    deliverables: 'Monitoring, Maintenance, Support, Security',
    duration: 'Ongoing',
    process: 'Onboarding, Implementation, Monitoring, Reporting',
    key_benefit: 'Focus on your business while experts handle your IT infrastructure and security'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect your business with advanced security solutions to identify and mitigate digital threats.',
    image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#8B5CF6',
    deliverables: 'Security assessment, Threat protection, Compliance, Training',
    duration: '1-3 months initial, ongoing maintenance',
    process: 'Assessment, Implementation, Monitoring, Response',
    key_benefit: 'Safeguard your data and systems from evolving cyber threats with proactive security measures'
  }
];

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  
  useEffect(() => {
    // Parse the hash from URL (remove the # character)
    const hash = location.hash.replace('#', '');
    
    // Find the service that matches the hash
    const serviceFromHash = services.find(service => service.id === hash);
    
    if (serviceFromHash) {
      // Update selected service if found
      setSelectedService(serviceFromHash);
    }
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    navigate(`/services#${value}`);
  };

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Our Services
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                  Comprehensive technology solutions designed to transform your business and drive innovation
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="mt-10 mb-8">
                <Tabs 
                  value={selectedService.id} 
                  onValueChange={handleTabChange}
                  className="justify-center"
                >
                  <TabsList className="bg-gray-800/60 inline-flex flex-wrap gap-2 h-auto p-2 rounded-xl">
                    {services.map((service) => (
                      <TabsTrigger 
                        key={service.id} 
                        value={service.id}
                        className="data-[state=active]:text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                        style={{ 
                          borderBottom: selectedService.id === service.id ? `2px solid ${service.color}` : 'none',
                          color: selectedService.id === service.id ? service.color : 'inherit'
                        }}
                      >
                        {service.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Selected Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl overflow-hidden shadow-lg h-full">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl shadow-lg h-full">
              <CardContent className="p-6 md:p-8">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-4" 
                  style={{ color: selectedService.color }}
                >
                  {selectedService.name}
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  {selectedService.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Card className="bg-gray-800/60 rounded-lg">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-400 mb-1">Deliverables</h3>
                      <p className="text-white font-medium">{selectedService.deliverables}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/60 rounded-lg">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-400 mb-1">Typical Duration</h3>
                      <p className="text-white font-medium">{selectedService.duration}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/60 rounded-lg col-span-1 md:col-span-2">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-400 mb-1">Process</h3>
                      <p className="text-white font-medium">{selectedService.process}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card 
                  className="rounded-lg backdrop-blur-sm"
                  style={{ backgroundColor: `${selectedService.color}20` }}
                >
                  <CardContent className="p-5">
                    <h3 
                      className="text-lg font-medium mb-2"
                      style={{ color: selectedService.color }}
                    >
                      Key Benefit
                    </h3>
                    <p className="text-gray-300">
                      {selectedService.key_benefit}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
