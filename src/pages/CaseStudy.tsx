import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { ArrowLeft, ChevronRight, Calendar, Users, BarChart, Building } from "lucide-react";
import { motion } from "framer-motion";
import { recruitmentService } from "@/data/services/recruitmentService";

interface CaseStudyData {
  id: string;
  title: string;
  client: string;
  industry: string;
  date: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    text: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  technologies: string[];
  image: string;
  images: string[];
}

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch with a timeout
    const timer = setTimeout(() => {
      // Check if this is the recruitment service case study
      if (serviceParam === 'recruitment') {
        setCaseStudy({
          id: "recruitment-1",
          title: recruitmentService.case_study.title,
          client: recruitmentService.case_study.client,
          industry: "Transportation & Logistics",
          date: "June 2023",
          description: recruitmentService.case_study.description,
          challenge: "Midwest Express Logistics was struggling with a severe driver shortage that was limiting their ability to take on new contracts and maintain service levels. Their traditional recruitment methods were expensive and yielding poor-quality candidates. They were spending over $12,000 per hire and still facing a 85% turnover rate within the first six months. The company needed a comprehensive recruitment marketing strategy that could attract qualified CDL drivers while reducing costs and improving retention.",
          solution: "We developed a comprehensive recruitment marketing strategy specifically tailored for truck driver recruiting. This included creating targeted campaigns across multiple channels including social media, job boards, and industry-specific platforms. We built optimized landing pages with streamlined application processes, developed compelling driver-focused messaging that highlighted benefits and company culture, and implemented advanced tracking and analytics to measure campaign performance. We also created a driver referral program and automated follow-up sequences to improve conversion rates.",
          results: {
            text: "The recruitment marketing campaign delivered exceptional results for Midwest Express Logistics. Within 90 days, they saw a 250% increase in qualified driver applications, with a 38% reduction in cost-per-hire. Most importantly, the quality of candidates improved significantly, leading to a 25% improvement in driver retention rates. The company was able to fill their driver shortage and take on additional contracts, directly impacting their bottom line.",
            stats: [
              { value: "250%", label: "Increase in driver applications" },
              { value: "38%", label: "Reduction in cost-per-hire" },
              { value: "25%", label: "Improvement in retention rate" },
              { value: "90", label: "Days to full implementation" }
            ]
          },
          testimonial: {
            quote: "The recruitment marketing strategy transformed our hiring process. We went from struggling to find drivers to having a pipeline of qualified candidates. The reduction in cost-per-hire alone saved us over $180,000 in the first year.",
            author: "Mike Rodriguez",
            position: "Operations Manager, Midwest Express Logistics"
          },
          technologies: ["Facebook Ads", "Google Ads", "Indeed", "LinkedIn", "Custom Landing Pages", "CRM Integration", "Analytics Dashboard"],
          image: recruitmentService.case_study.image,
          images: [
            "/lovable-uploads/1e9d8177-66c6-4b9f-b830-04c0e28d026e.png",
            "/lovable-uploads/7f21da0a-fd77-43ea-a7af-3b11648397c0.png",
            "/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
          ]
        });
      } else {
        // Default case study for other services
        setCaseStudy({
          id: "1",
          title: "Enterprise Digital Transformation",
          client: "Global Manufacturing Inc.",
          industry: "Manufacturing",
          date: "March 2023",
          description: "A comprehensive digital transformation initiative for a global manufacturing leader, modernizing operations across 12 facilities.",
          challenge: "Global Manufacturing Inc. was facing multiple challenges with outdated legacy systems that were causing inefficiencies, data silos, and limiting their ability to scale. They needed a comprehensive digital transformation solution that would streamline operations, improve data accessibility, and enhance collaboration across their 12 manufacturing facilities worldwide.",
          solution: "ƷBI designed and implemented an end-to-end digital transformation strategy, including cloud-based ERP systems, custom workflow automation tools, and a comprehensive data analytics platform. The solution integrated IoT sensors for real-time equipment monitoring, implemented AI-driven predictive maintenance, and created mobile applications for floor managers. We also established a centralized data warehouse with real-time dashboards and conducted extensive training programs for staff across all levels.",
          results: {
            text: "The digital transformation initiative delivered exceptional results across all key performance indicators. Production efficiency increased by 35% due to streamlined workflows and automated processes. Operating costs were reduced by 28% through optimized resource allocation and predictive maintenance. The time-to-market for new products decreased by 42% thanks to improved collaboration and data-driven decision making. Employee satisfaction scores improved by 26% with the introduction of more intuitive tools and systems.",
            stats: [
              { value: "35%", label: "Increase in operational efficiency" },
              { value: "28%", label: "Reduction in operational costs" },
              { value: "42%", label: "Improvement in time-to-market" },
              { value: "26%", label: "Increase in employee satisfaction" }
            ]
          },
          testimonial: {
            quote: "ƷBI's strategic approach to our digital transformation needs was exceptional. They didn't just provide technology solutions—they became true partners in our business evolution. The results have exceeded our expectations in every measurable way.",
            author: "Sarah Johnson",
            position: "CTO, Global Manufacturing Inc."
          },
          technologies: ["React", "Node.js", "PostgreSQL", "Azure Cloud", "IoT", "Machine Learning", "Power BI"],
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          images: [
            "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          ]
        });
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, serviceParam]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="space-card p-8 rounded-xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white">Loading case study...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!caseStudy) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="space-card p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h2>
            <p className="text-gray-300 mb-6">We couldn't find the case study you're looking for.</p>
            <Button asChild>
              <Link to="/portfolio">
                <ArrowLeft className="mr-2" size={18} />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${caseStudy.title} | Case Study`}
        description={`Learn how ƷBI helped ${caseStudy.client} achieve significant improvements through our innovative solutions.`}
        image={caseStudy.image}
      />
      
      <Navbar />
      
      <main className="pt-24 pb-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-96 md:h-[500px] w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={caseStudy.image} 
              alt={caseStudy.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link 
                      to={serviceParam === 'recruitment' ? '/recruitment-marketing' : '/portfolio'} 
                      className="inline-flex items-center text-accent mb-6 hover:text-accent/80 transition-colors"
                    >
                      <ArrowLeft className="mr-2" size={18} />
                      <span>Back to {serviceParam === 'recruitment' ? 'Recruitment Marketing' : 'Portfolio'}</span>
                    </Link>
                    
                    <span className="text-accent bg-black/30 px-3 py-1 rounded-full text-sm">{caseStudy.industry}</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white my-4">{caseStudy.title}</h1>
                    
                    <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                      {caseStudy.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
                      <div className="flex items-center">
                        <Building size={16} className="mr-2" />
                        <span>{caseStudy.client}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{caseStudy.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Sections */}
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Challenge Section */}
              <section className="space-card p-8 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                <p className="text-gray-300">{caseStudy.challenge}</p>
              </section>
              
              {/* Solution Section */}
              <section className="space-card p-8 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
                <p className="text-gray-300 mb-6">{caseStudy.solution}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {caseStudy.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Solution image ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Results Section */}
              <section className="space-card p-8 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  <div className="flex items-center">
                    <BarChart className="mr-2" />
                    <span>Results & Impact</span>
                  </div>
                </h2>
                <p className="text-gray-300 mb-6">{caseStudy.results.text}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {caseStudy.results.stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="bg-accent/10 p-4 rounded-lg text-center border border-accent/20"
                    >
                      <div className="text-accent text-2xl md:text-3xl font-bold">
                        {stat.value}
                      </div>
                      <div className="text-gray-300 text-sm mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Testimonial Section */}
              {caseStudy.testimonial && (
                <section className="space-card p-8 rounded-xl mb-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-accent text-6xl font-serif mb-4">"</div>
                    <p className="text-white text-lg md:text-xl italic mb-6">
                      {caseStudy.testimonial.quote}
                    </p>
                    <div className="flex flex-col items-center">
                      <p className="font-medium text-white">
                        {caseStudy.testimonial.author}
                      </p>
                      <p className="text-gray-400">
                        {caseStudy.testimonial.position}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Details */}
              <div className="space-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Client</p>
                    <p className="text-white">{caseStudy.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Industry</p>
                    <p className="text-white">{caseStudy.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">{caseStudy.date}</p>
                  </div>
                </div>
              </div>
              
              {/* Technologies Used */}
              <div className="space-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <div className="space-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">Interested in Similar Results?</h3>
                <p className="text-gray-300 mb-4">
                  Let's discuss how we can help your business achieve similar success.
                </p>
                <Button asChild className="w-full bg-accent hover:bg-accent/80 text-white">
                  <Link to="/get-quote">
                    Get a Free Consultation
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Case Studies */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Healthcare Patient Management Platform" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent">Healthcare</span>
                  <h3 className="text-xl font-bold my-2 text-white">Healthcare Patient Management Platform</h3>
                  <p className="text-gray-400 text-sm mb-4">Client: Regional Medical Center</p>
                  <Button variant="outline" className="w-full">View Case Study</Button>
                </div>
              </div>
              
              <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Retail E-commerce Platform" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent">Retail</span>
                  <h3 className="text-xl font-bold my-2 text-white">Retail E-commerce Platform</h3>
                  <p className="text-gray-400 text-sm mb-4">Client: Fashion Retailer</p>
                  <Button variant="outline" className="w-full">View Case Study</Button>
                </div>
              </div>
              
              <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Financial Analytics Dashboard" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent">Finance</span>
                  <h3 className="text-xl font-bold my-2 text-white">Financial Analytics Dashboard</h3>
                  <p className="text-gray-400 text-sm mb-4">Client: Investment Firm</p>
                  <Button variant="outline" className="w-full">View Case Study</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CaseStudy;
