
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = [
  {
    id: 'strategy',
    name: 'Strategic Consulting',
    description: 'Comprehensive technology strategy development and roadmap planning aligned with your business objectives.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#7C3AED',
    deliverables: 'Technology roadmap, Gap analysis, ROI projections',
    duration: '4-8 weeks',
    process: 'Assessment, Analysis, Strategy Development, Implementation Planning',
    key_benefit: 'Align technology investments with business goals to maximize ROI and competitive advantage'
  },
  {
    id: 'digital',
    name: 'Digital Transformation',
    description: 'End-to-end digital transformation services to modernize legacy systems and create innovative digital experiences.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#2563EB',
    deliverables: 'Transformation blueprint, System architecture, Implementation roadmap',
    duration: '3-12 months',
    process: 'Discovery, Design, Development, Deployment, Support',
    key_benefit: 'Increase operational efficiency while reducing costs through strategic technology adoption'
  },
  {
    id: 'custom',
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
    id: 'web',
    name: 'Web & Mobile Apps',
    description: 'Responsive, user-friendly applications for web and mobile platforms with exceptional user experiences.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#F59E0B',
    deliverables: 'Progressive web apps, Native mobile apps, Responsive websites',
    duration: '1-6 months',
    process: 'UI/UX Design, Frontend Development, Backend Integration, Testing',
    key_benefit: 'Reach your customers on any device with intuitive, engaging digital experiences'
  },
  {
    id: 'analytics',
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
    id: 'ai',
    name: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence and machine learning to optimize operations and gain competitive advantages.',
    image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#8B5CF6',
    deliverables: 'Predictive models, ML algorithms, AI integrations',
    duration: '2-6 months',
    process: 'Data Preparation, Model Development, Validation, Integration',
    key_benefit: 'Automate processes, predict trends, and unlock new opportunities with AI-powered solutions'
  }
];

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceParam = searchParams.get('service');
    
    if (serviceParam) {
      const foundService = services.find(service => service.id === serviceParam);
      if (foundService) {
        setSelectedService(foundService);
      }
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    navigate(`/services?service=${value}`);
  };

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="space-card p-8 rounded-xl mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Services
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Comprehensive technology solutions designed to transform your business and drive innovation
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-8">
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
          </div>

          {/* Selected Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-card p-4 md:p-6 overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="space-card p-6 md:p-8 rounded-xl shadow-lg">
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
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Deliverables</h3>
                  <p className="text-white font-medium">{selectedService.deliverables}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Typical Duration</h3>
                  <p className="text-white font-medium">{selectedService.duration}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg col-span-1 md:col-span-2">
                  <h3 className="text-sm text-gray-400 mb-1">Process</h3>
                  <p className="text-white font-medium">{selectedService.process}</p>
                </div>
              </div>

              <div 
                className="bg-opacity-20 backdrop-blur-sm p-5 rounded-lg" 
                style={{ backgroundColor: `${selectedService.color}20` }}
              >
                <h3 
                  className="text-lg font-medium mb-2"
                  style={{ color: selectedService.color }}
                >
                  Key Benefit
                </h3>
                <p className="text-gray-300">
                  {selectedService.key_benefit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
