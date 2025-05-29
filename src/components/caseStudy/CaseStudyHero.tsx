
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building } from 'lucide-react';

interface CaseStudyHeroProps {
  title: string;
  client: string;
  industry: string;
  date: string;
  description: string;
  image: string;
  serviceParam: string | null;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  client,
  industry,
  date,
  description,
  image,
  serviceParam
}) => {
  return (
    <section className="relative">
      <div className="h-96 md:h-[500px] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={image} 
          alt={title} 
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
                
                <span className="text-accent bg-black/30 px-3 py-1 rounded-full text-sm">{industry}</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white my-4">{title}</h1>
                
                <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                  {description}
                </p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
                  <div className="flex items-center">
                    <Building size={16} className="mr-2" />
                    <span>{client}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{date}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
