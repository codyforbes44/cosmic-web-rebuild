import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import PageHeader from '@/components/PageHeader';
import { LucideIcon } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

interface StandardPageLayoutProps {
  children: React.ReactNode;
  seo?: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: string;
    faqs?: FAQItem[];
    breadcrumbs?: BreadcrumbSchemaItem[];
    structuredData?: object | object[];
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      author?: string;
      section?: string;
      tags?: string[];
    };
  };
  breadcrumb?: {
    label: string;
    items?: Array<{ label: string; path?: string; }>;
  };
  header?: {
    title: string;
    description: string;
    icon?: LucideIcon;
  };
  className?: string;
}

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  children,
  seo,
  breadcrumb,
  header,
  className = ""
}) => {
  return (
    <>
      {seo && (
        <SEO 
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          image={seo.image}
          type={seo.type || "website"}
          faqs={seo.faqs}
          breadcrumbs={seo.breadcrumbs}
          structuredData={seo.structuredData}
          article={seo.article}
        />
      )}
      <Navbar />
      <StarBackground />
      <main className={`min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 ${className}`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
          {breadcrumb && (
            <BreadcrumbNav 
              currentPageLabel={breadcrumb.label}
              items={breadcrumb.items}
            />
          )}
          
          {header && (
            <PageHeader 
              title={header.title}
              description={header.description}
              icon={header.icon}
            />
          )}
          
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StandardPageLayout;
