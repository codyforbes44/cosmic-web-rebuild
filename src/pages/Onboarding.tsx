
import React from 'react';
import StandardPageLayout from "@/layouts/StandardPageLayout";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import OnboardingBenefits from "@/components/onboarding/OnboardingBenefits";
import { UserPlus } from "lucide-react";
import { generateHowToSchema } from "@/utils/seoUtils/advancedSchemas";

const Onboarding = () => {
  // Generate HowTo structured data for the onboarding process
  const howToSchema = generateHowToSchema({
    name: "How to Complete Client Onboarding at ƷBI",
    description: "Follow these steps to complete the client onboarding process and get started with personalized business and technology solutions.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop&crop=center",
    totalTime: "PT10M",
    steps: [
      {
        name: "Personal Information",
        text: "Provide your first name, last name, email address, and phone number so we can contact you about your project.",
        image: "https://zephyel.com/og-images/onboarding-step1.png"
      },
      {
        name: "Business Information",
        text: "Share details about your company including company name, industry, company size, and website URL to help us understand your business context.",
        image: "https://zephyel.com/og-images/onboarding-step2.png"
      },
      {
        name: "Project Information",
        text: "Select your primary goals, budget range, and project timeline to help us tailor solutions to your specific needs.",
        image: "https://zephyel.com/og-images/onboarding-step3.png"
      },
      {
        name: "Communication Preferences",
        text: "Choose your preferred contact method and communication frequency, then accept the terms to complete your onboarding.",
        image: "https://zephyel.com/og-images/onboarding-step4.png"
      }
    ]
  });

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zephyel.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Client Onboarding",
        "item": "https://zephyel.com/onboarding"
      }
    ]
  };

  return (
    <StandardPageLayout
      seo={{
        title: "Client Onboarding",
        description: "Welcome to ƷBI! Complete our onboarding process to get started with our business and technology services tailored to your needs.",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop&crop=center",
        type: "website",
        structuredData: [howToSchema, breadcrumbSchema]
      }}
      breadcrumb={{ label: "Client Onboarding" }}
      header={{
        title: "Welcome to ƷBI",
        description: "Complete our onboarding process to get started with personalized business and technology solutions.",
        icon: UserPlus
      }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
        {/* Benefits - Full width on mobile, 4 columns on XL screens */}
        <div className="xl:col-span-4 order-1 xl:order-1">
          <OnboardingBenefits />
        </div>
        
        {/* Onboarding Form - Full width on mobile, 8 columns on XL screens */}
        <div className="xl:col-span-8 order-2 xl:order-2">
          <OnboardingForm />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default Onboarding;
