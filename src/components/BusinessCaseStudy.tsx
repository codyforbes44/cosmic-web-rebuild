
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  industry: string;
  results: string;
}

const BusinessCaseStudy = () => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setCaseStudy({
        id: "1",
        title: "Enterprise Digital Transformation",
        client: "Global Manufacturing Inc.",
        description: "ƷBI partnered with Global Manufacturing Inc. to modernize their operations through an end-to-end digital transformation initiative. We implemented cloud-based ERP systems, developed custom workflow automation tools, and created a comprehensive data analytics platform, resulting in a 35% increase in operational efficiency and 28% reduction in costs.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        industry: "Manufacturing",
        results: "35% increase in operational efficiency, 28% reduction in costs, 42% improvement in time-to-market"
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-space-deep-blue/30 relative">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : caseStudy ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-accent mb-4 text-sm uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h2>
              <p className="text-gray-300 mb-6">{caseStudy.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Client</h4>
                  <p className="font-medium">{caseStudy.client}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Industry</h4>
                  <p className="font-medium">{caseStudy.industry}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm text-gray-400 mb-2">Results</h4>
                <p className="font-medium text-accent">{caseStudy.results}</p>
              </div>
              
              <Link to={`/case-study/${caseStudy.id}`}>
                <Button className="group" variant="outline">
                  View Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-accent/30 rounded-lg blur-xl opacity-60"></div>
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="rounded-lg shadow-2xl relative w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No case study available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessCaseStudy;
