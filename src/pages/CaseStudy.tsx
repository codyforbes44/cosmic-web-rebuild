
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { recruitmentService } from "@/data/services/recruitmentService";
import CaseStudyHero from "@/components/caseStudy/CaseStudyHero";
import CaseStudyContent from "@/components/caseStudy/CaseStudyContent";
import CaseStudySidebar from "@/components/caseStudy/CaseStudySidebar";
import RelatedCaseStudies from "@/components/caseStudy/RelatedCaseStudies";
import { PageLoading } from "@/components/ui/UnifiedLoading";
import NotFoundState from "@/components/caseStudy/NotFoundState";

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
        <div className="min-h-screen pt-24">
          <PageLoading message="Loading case study..." />
        </div>
        <Footer />
      </>
    );
  }

  if (!caseStudy) {
    return <NotFoundState />;
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
        <CaseStudyHero 
          title={caseStudy.title}
          client={caseStudy.client}
          industry={caseStudy.industry}
          date={caseStudy.date}
          description={caseStudy.description}
          image={caseStudy.image}
          serviceParam={serviceParam}
        />
        
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CaseStudyContent 
              challenge={caseStudy.challenge}
              solution={caseStudy.solution}
              images={caseStudy.images}
              results={caseStudy.results}
              testimonial={caseStudy.testimonial}
            />
            
            <CaseStudySidebar 
              client={caseStudy.client}
              industry={caseStudy.industry}
              date={caseStudy.date}
              technologies={caseStudy.technologies}
            />
          </div>
          
          <RelatedCaseStudies />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CaseStudy;
