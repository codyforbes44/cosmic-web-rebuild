import React from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import QuoteForm from '@/components/quote/QuoteForm';
import ServicesList from '@/components/quote/ServicesList';
import { FileText } from 'lucide-react';

const GetQuote = () => {
  return (
    <StandardPageLayout
      seo={{
        title: "Get a Quote | ƷBI",
        description: "Request a personalized quote for ƷBI's business and technology services. Our team will provide a detailed proposal tailored to your needs.",
        image: "/og-images/get-quote.png",
        type: "website"
      }}
      breadcrumb={{ label: "Get a Quote" }}
      header={{
        title: "Get a Quote",
        description: "Request a personalized quote for our business and technology services. Our team will provide a detailed proposal tailored to your needs.",
        icon: FileText
      }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        {/* Services List - Full width on mobile, 4 columns on XL screens */}
        <div className="xl:col-span-4 order-1 xl:order-1">
          <ServicesList />
        </div>
        
        {/* Quote Form - Full width on mobile, 8 columns on XL screens */}
        <div className="xl:col-span-8 order-2 xl:order-2">
          <QuoteForm />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default GetQuote;
