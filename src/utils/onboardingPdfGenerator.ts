
import { jsPDF } from 'jspdf';
import { OnboardingFormData } from '@/components/onboarding/types/formSchema';

export const generateOnboardingPDF = (data: OnboardingFormData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;

  // Header
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text('ƷBI Client Onboarding Form', margin, 25);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - 60, 35);

  yPosition = 60;

  // Personal Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Personal Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${data.firstName} ${data.lastName}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Email: ${data.email}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Phone: ${data.phone}`, margin, yPosition);
  yPosition += 20;

  // Business Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Business Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Company: ${data.companyName}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Industry: ${data.industry}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Company Size: ${data.companySize}`, margin, yPosition);
  yPosition += 8;
  if (data.website) {
    doc.text(`Website: ${data.website}`, margin, yPosition);
    yPosition += 8;
  }
  doc.text(`Monthly Marketing Budget: ${data.monthlyMarketingBudget}`, margin, yPosition);
  yPosition += 12;

  // Project Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Project Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Primary Goals:', margin, yPosition);
  yPosition += 8;
  
  data.primaryGoals.forEach((goal) => {
    doc.text(`• ${goal}`, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 8;

  doc.text(`Budget Range: ${data.budget}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Timeline: ${data.timeline}`, margin, yPosition);
  yPosition += 20;

  // Preferences Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Communication Preferences', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Preferred Contact Method: ${data.preferredContact}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Communication Frequency: ${data.communicationFrequency}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Terms Accepted: ${data.termsAccepted ? 'Yes' : 'No'}`, margin, yPosition);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(41, 128, 185);
  doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('ƷBI - Business & Technology Solutions', margin, pageHeight - 15);
  doc.text('support@3bi.io | +1 (817) 757-2828', margin, pageHeight - 8);

  // Generate filename and save
  const fileName = `3BI_Onboarding_${data.firstName}_${data.lastName}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
