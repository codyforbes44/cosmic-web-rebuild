import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formSchema, OnboardingFormData } from './types/formSchema';
import { useOnboardingSubmission } from './hooks/useOnboardingSubmission';
import PersonalInfoSection from './sections/PersonalInfoSection';
import BusinessInfoSection from './sections/BusinessInfoSection';
import ProjectInfoSection from './sections/ProjectInfoSection';
import PreferencesSection from './sections/PreferencesSection';
import { generateOnboardingPDF } from '@/utils/onboardingPdfGenerator';
import { generateBlankOnboardingPDF } from '@/utils/blankOnboardingPdfGenerator';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, FileText } from 'lucide-react';

const OnboardingForm = () => {
  const { isSubmitting, submitOnboarding } = useOnboardingSubmission();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      industry: '',
      companySize: '',
      website: '',
      primaryGoals: [],
      budget: '',
      timeline: '',
      preferredContact: 'email',
      communicationFrequency: 'weekly',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    await submitOnboarding(data, () => form.reset());
  };

  const handleDownloadBlankPDF = () => {
    generateBlankOnboardingPDF();
  };

  const handleDownloadPDF = () => {
    const formData = form.getValues();
    
    // Basic validation to ensure required fields are filled
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'industry', 'companySize'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof OnboardingFormData]);
    
    if (missingFields.length > 0 || formData.primaryGoals.length === 0 || !formData.budget || !formData.timeline) {
      form.trigger(); // Show validation errors
      return;
    }

    generateOnboardingPDF(formData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', component: PersonalInfoSection },
    { number: 2, title: 'Business Info', component: BusinessInfoSection },
    { number: 3, title: 'Project Info', component: ProjectInfoSection },
    { number: 4, title: 'Preferences', component: PreferencesSection },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <Card className="space-card p-8 rounded-xl">
      <CardContent className="p-0">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.number 
                    ? 'bg-accent text-black' 
                    : currentStep > step.number 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h3>
              <p className="text-gray-400 text-sm">
                Complete all steps to get started with ƷBI services
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadBlankPDF}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Blank Form
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPDF}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CurrentStepComponent control={form.control} />

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
