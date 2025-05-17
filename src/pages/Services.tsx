
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: 'dynamic-advertising',
    name: 'Dynamic Advertising',
    description: 'Targeted advertising solutions that adapt in real-time to audience behavior and market conditions.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#06B6D4',
    deliverables: 'Campaign strategy, Creative assets, Performance analytics',
    duration: '1-3 months',
    process: 'Strategy, Creative Development, Implementation, Optimization',
    key_benefit: 'Increase ROI with advertising that adapts to your audience's needs and behaviors'
  },
  {
    id: 'social-media-advertising',
    name: 'Social Media Advertising',
    description: 'Strategic social media campaigns designed to increase brand awareness and drive engagement.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#F59E0B',
    deliverables: 'Platform strategy, Content calendar, Ad creative, Analytics',
    duration: '1-2 months',
    process: 'Platform Selection, Content Strategy, Ad Creation, Monitoring',
    key_benefit: 'Connect with your target audience where they spend their time and drive meaningful engagement'
  },
  {
    id: 'recruitment-marketing',
    name: 'Recruitment Marketing',
    description: 'Specialized marketing strategies focused on attracting top talent to your organization.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#8B5CF6',
    deliverables: 'Employer brand strategy, Job ad campaigns, Candidate journey optimization',
    duration: '1-3 months',
    process: 'Brand Assessment, Strategy Development, Campaign Execution, Optimization',
    key_benefit: 'Attract qualified candidates and reduce hiring costs with targeted recruitment strategies'
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence Reporting',
    description: 'Comprehensive data analytics and reporting solutions to drive informed business decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#EC4899',
    deliverables: 'Custom dashboards, KPI tracking, Trend analysis, Executive reports',
    duration: '1-2 months',
    process: 'Requirements Gathering, Data Integration, Dashboard Creation, Training',
    key_benefit: 'Transform raw data into actionable insights that drive strategic business decisions'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Custom website development focused on performance, user experience, and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#10B981',
    deliverables: 'Website design, Development, CMS integration, SEO optimization',
    duration: '2-4 months',
    process: 'Discovery, Design, Development, Testing, Deployment',
    key_benefit: 'Create a high-performing digital presence that drives traffic and conversions'
  },
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
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Streamline operations by automating repetitive tasks and complex business processes.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#6366F1',
    deliverables: 'Process mapping, Automation solutions, Integration, Training',
    duration: '1-3 months',
    process: 'Process Analysis, Solution Design, Implementation, Training',
    key_benefit: 'Reduce manual effort, minimize errors, and improve efficiency across your organization'
  },
  {
    id: 'ai-integrations',
    name: 'AI Integrations',
    description: 'Implement artificial intelligence solutions that enhance decision-making and operational efficiency.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#8B5CF6',
    deliverables: 'AI solution design, Integration, Training, Ongoing optimization',
    duration: '2-6 months',
    process: 'Assessment, Design, Development, Implementation, Optimization',
    key_benefit: 'Leverage cutting-edge AI technology to gain competitive advantage and drive innovation'
  },
  {
    id: 'web3-services',
    name: 'Web3 Services',
    description: 'Blockchain and decentralized web solutions for next-generation digital experiences and applications.',
    image: 'https://images.unsplash.com/photo-1639322537231-2f206e06af84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#EF4444',
    deliverables: 'Smart contract development, dApp creation, Web3 integration, Security audits',
    duration: '3-8 months',
    process: 'Strategy, Architecture, Development, Testing, Deployment',
    key_benefit: 'Build trust, security, and innovation with cutting-edge decentralized technologies'
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
