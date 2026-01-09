
import React from 'react';
import StandardPageLayout from "@/layouts/StandardPageLayout";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import OnboardingBenefits from "@/components/onboarding/OnboardingBenefits";
import { UserPlus } from "lucide-react";

const Onboarding = () => {
  return (
    <StandardPageLayout
      seo={{
        title: "Client Onboarding",
        description: "Welcome to ƷBI! Complete our onboarding process to get started with our business and technology services tailored to your needs.",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop&crop=center",
        type: "website"
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
