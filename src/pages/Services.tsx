
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServiceFeature from "@/components/ServiceFeature";
import ServiceCaseStudy from "@/components/ServiceCaseStudy";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import { Check, ArrowRight, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    key_benefit: 'Align technology investments with business goals to maximize ROI and competitive advantage',
    benefits: [
      'Strategic technology roadmap tailored to your business goals',
      'Comprehensive analysis of current systems and future needs',
      'Clear implementation priorities with ROI projections',
      'Expert guidance from industry veterans'
    ],
    pain_points: [
      'Outdated systems holding back business growth',
      'Unclear technology investment priorities',
      'Difficulty aligning IT with business objectives',
      'Concerns about wasting resources on the wrong solutions'
    ],
    case_study: {
      title: "Tech Transformation Strategy",
      client: "Global Manufacturing Inc.",
      description: "We developed a comprehensive technology strategy for this manufacturing leader, identifying key opportunities for digital transformation and automation.",
      results: [
        { label: "ROI Increase", value: "37%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Cost Savings", value: "$1.2M", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Efficiency Gain", value: "25%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
    key_benefit: 'Increase operational efficiency while reducing costs through strategic technology adoption',
    benefits: [
      'Modernize legacy systems with minimal disruption',
      'Streamline operations with integrated digital workflows',
      'Enable data-driven decision making across your organization',
      'Improve customer and employee digital experiences'
    ],
    pain_points: [
      'Legacy systems that can't keep up with business needs',
      'Disconnected data silos limiting visibility',
      'Inefficient manual processes wasting time and resources',
      'Competitive pressure from more digitally advanced rivals'
    ],
    case_study: {
      title: "Healthcare Provider Digital Overhaul",
      client: "Regional Medical Center",
      description: "We transformed the client's outdated record systems into a modern digital platform, improving patient care and operational efficiency.",
      results: [
        { label: "Time Saved", value: "65%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Error Reduction", value: "87%", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Patient Satisfaction", value: "+42%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
    key_benefit: 'Purpose-built software that perfectly addresses your specific business requirements',
    benefits: [
      'Precisely tailored solutions for your unique business needs',
      'Seamless integration with your existing technology ecosystem',
      'Scalable architecture designed to grow with your business',
      'Full ownership of your custom software assets'
    ],
    pain_points: [
      'Off-the-shelf software that doesn't fit your processes',
      'Unique business challenges requiring specialized solutions',
      'Integration issues between multiple software systems',
      'Need for competitive advantage through proprietary tools'
    ],
    case_study: {
      title: "Logistics Management Platform",
      client: "Interstate Transport Co.",
      description: "We built a custom logistics management platform that integrated route optimization, driver management, and customer communications.",
      results: [
        { label: "Fuel Savings", value: "22%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Delivery Time", value: "-35%", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Customer Retention", value: "+18%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
    key_benefit: 'Reach your customers on any device with intuitive, engaging digital experiences',
    benefits: [
      'Engage users with intuitive, responsive interfaces',
      'Consistent experience across all devices and platforms',
      'Performance optimized for conversion and retention',
      'Future-proof technologies with ongoing support'
    ],
    pain_points: [
      'Poor user experience limiting customer engagement',
      'Outdated websites not optimized for mobile devices',
      'Difficulty maintaining consistent brand experience',
      'Need for better digital conversion rates'
    ],
    case_study: {
      title: "E-commerce App Redesign",
      client: "Fashion Retailer Inc.",
      description: "We reimagined the client's online shopping experience with a modern, intuitive mobile app and responsive website, dramatically increasing conversions.",
      results: [
        { label: "Conversion Rate", value: "+58%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Engagement", value: "+125%", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Cart Abandonment", value: "-40%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
    key_benefit: 'Make data-driven decisions with real-time insights into your business operations',
    benefits: [
      'Visualize complex data through intuitive dashboards',
      'Track key performance indicators in real-time',
      'Uncover hidden insights to drive strategic decisions',
      'Predict trends and identify opportunities with advanced analytics'
    ],
    pain_points: [
      'Scattered data making insights difficult to obtain',
      'Inability to track business performance effectively',
      'Time wasted manually creating reports',
      'Decision making based on incomplete information'
    ],
    case_study: {
      title: "Retail Analytics Dashboard",
      client: "National Retail Chain",
      description: "We developed an integrated analytics platform that provided real-time insights across 200+ locations, enabling data-driven inventory and staffing decisions.",
      results: [
        { label: "Inventory Cost", value: "-23%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Stock Outs", value: "-68%", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Sales Increase", value: "+12%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
    key_benefit: 'Automate processes, predict trends, and unlock new opportunities with AI-powered solutions',
    benefits: [
      'Automate complex tasks to improve efficiency',
      'Predict customer behavior and market trends',
      'Enhance decision making with intelligent recommendations',
      'Stay ahead of competition with cutting-edge AI capabilities'
    ],
    pain_points: [
      'Manual processes consuming valuable resources',
      'Difficulty predicting customer needs and market changes',
      'Complex decisions requiring advanced analysis',
      'Competitors gaining advantage through AI adoption'
    ],
    case_study: {
      title: "Predictive Maintenance System",
      client: "Industrial Manufacturing Corp.",
      description: "We implemented an AI-powered predictive maintenance system that analyzed equipment sensor data to forecast failures before they occurred.",
      results: [
        { label: "Downtime", value: "-78%", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Maintenance Cost", value: "-42%", icon: <BarChart2 className="h-4 w-4 text-gray-400" /> },
        { label: "Equipment Lifespan", value: "+35%", icon: <PieChart className="h-4 w-4 text-gray-400" /> }
      ]
    }
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-card p-8 rounded-xl mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
              Comprehensive technology solutions designed to transform your business and drive innovation
            </p>

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
          </motion.div>

          {/* Service Content */}
          <Tabs value={selectedService.id} className="mb-16">
            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-0 animate-in fade-in-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-card p-4 md:p-6 overflow-hidden rounded-xl shadow-lg"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-card p-6 md:p-8 rounded-xl shadow-lg"
                  >
                    <h2 
                      className="text-3xl md:text-4xl font-bold mb-4" 
                      style={{ color: service.color }}
                    >
                      {service.name}
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h3 className="text-sm text-gray-400 mb-1">Deliverables</h3>
                        <p className="text-white font-medium">{service.deliverables}</p>
                      </div>
                      <div className="bg-gray-800/60 p-4 rounded-lg">
                        <h3 className="text-sm text-gray-400 mb-1">Typical Duration</h3>
                        <p className="text-white font-medium">{service.duration}</p>
                      </div>
                      <div className="bg-gray-800/60 p-4 rounded-lg col-span-1 md:col-span-2">
                        <h3 className="text-sm text-gray-400 mb-1">Process</h3>
                        <p className="text-white font-medium">{service.process}</p>
                      </div>
                    </div>

                    <div 
                      className="bg-opacity-20 backdrop-blur-sm p-5 rounded-lg" 
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <h3 
                        className="text-lg font-medium mb-2"
                        style={{ color: service.color }}
                      >
                        Key Benefit
                      </h3>
                      <p className="text-gray-300">
                        {service.key_benefit}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                      <Link to="/get-quote">
                        <Button 
                          className="flex items-center gap-2"
                          style={{ backgroundColor: service.color }}
                        >
                          Get a Quote <ArrowRight size={16} />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
                
                {/* Pain Points and Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800"
                  >
                    <h3 className="text-xl font-bold mb-6">Common Challenges We Solve</h3>
                    <ul className="space-y-4">
                      {service.pain_points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <div 
                            className="mr-3 p-1 rounded-full mt-1" 
                            style={{ backgroundColor: `${service.color}30` }}
                          >
                            <Check className="h-4 w-4" style={{ color: service.color }} />
                          </div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800"
                  >
                    <h3 className="text-xl font-bold mb-6">Key Benefits</h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <div 
                            className="mr-3 p-1 rounded-full mt-1" 
                            style={{ backgroundColor: `${service.color}30` }}
                          >
                            <Check className="h-4 w-4" style={{ color: service.color }} />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                
                {/* Case Study */}
                <div className="mt-16">
                  <ServiceCaseStudy 
                    serviceId={service.id}
                    title={service.case_study.title}
                    client={service.case_study.client}
                    description={service.case_study.description}
                    results={service.case_study.results}
                    color={service.color}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Featured Service Highlights */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Key Service Areas</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Explore how our comprehensive service offerings can transform your business operations and technology infrastructure
              </p>
            </div>
            
            <div className="space-y-24">
              {services.slice(0, 3).map((service, idx) => (
                <ServiceFeature
                  key={service.id}
                  title={service.name}
                  description={service.description}
                  benefits={service.benefits.slice(0, 3)}
                  image={service.image}
                  color={service.color}
                  align={idx % 2 === 0 ? 'left' : 'right'}
                  cta={{ text: "Learn More", link: `/services?service=${service.id}` }}
                  index={idx}
                />
              ))}
            </div>
          </section>
          
          {/* Client Logo Banner */}
          <ClientLogoBanner 
            title="Trusted By Industry Leaders" 
            subtitle="Join hundreds of businesses that rely on our expert services" 
          />
          
          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-800 rounded-xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8">
                Schedule a free consultation with our team to discuss how our services can help you achieve your business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-quote">
                  <Button className="bg-accent hover:bg-accent/80 text-white px-6 py-3">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/20 hover:bg-white/5">
                    Contact Us
                  </Button>
                </Link>
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
