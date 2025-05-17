
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <section className="py-24 bg-space-deep-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Featured Case Study</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how we've helped our clients achieve exceptional results through innovative technology solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-card overflow-hidden rounded-xl order-1 lg:order-2">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              <img 
                src={caseStudy?.image} 
                alt={caseStudy?.title} 
                className="w-full h-96 object-cover"
              />
            )}
          </div>

          <div className="space-card p-6 overflow-hidden rounded-xl order-2 lg:order-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              <>
                <span className="text-accent font-medium text-sm">{caseStudy?.industry} Industry</span>
                <h3 className="text-2xl font-bold my-3 text-white">{caseStudy?.title}</h3>
                <p className="text-gray-300 mb-6">{caseStudy?.description}</p>
                
                <div className="bg-gray-800/40 p-4 rounded-lg mb-6">
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Results</h4>
                  <p className="text-white">{caseStudy?.results}</p>
                </div>
                
                <Button asChild className="bg-accent hover:bg-accent/80 text-white">
                  <Link to={`/case-study/${caseStudy?.id}`}>
                    Read Full Case Study
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCaseStudy;
