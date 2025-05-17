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
  return;
};
export default BusinessCaseStudy;