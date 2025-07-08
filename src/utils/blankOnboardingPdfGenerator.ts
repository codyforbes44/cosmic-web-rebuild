
import { jsPDF } from 'jspdf';

export const generateBlankOnboardingPDF = () => {
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
  doc.text(`Date: _______________`, pageWidth - 60, 35);

  yPosition = 60;

  // Personal Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Personal Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // First Name
  doc.text('First Name:', margin, yPosition);
  doc.line(margin + 25, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;
  
  // Last Name
  doc.text('Last Name:', margin, yPosition);
  doc.line(margin + 25, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;
  
  // Email
  doc.text('Email:', margin, yPosition);
  doc.line(margin + 20, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;
  
  // Phone
  doc.text('Phone:', margin, yPosition);
  doc.line(margin + 20, yPosition, pageWidth - margin, yPosition);
  yPosition += 20;

  // Business Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Business Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Company Name
  doc.text('Company Name:', margin, yPosition);
  doc.line(margin + 35, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;
  
  // Industry
  doc.text('Industry:', margin, yPosition);
  doc.line(margin + 22, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;
  
  // Company Size
  doc.text('Company Size:', margin, yPosition);
  yPosition += 8;
  const companySizes = ['☐ 1-10 employees', '☐ 11-50 employees', '☐ 51-200 employees', '☐ 201-500 employees', '☐ 500+ employees'];
  companySizes.forEach((size) => {
    doc.text(size, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 8;
  
  // Website
  doc.text('Website (Optional):', margin, yPosition);
  doc.line(margin + 40, yPosition, pageWidth - margin, yPosition);
  yPosition += 20;

  // Project Information Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Project Information', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Primary Goals
  doc.text('Primary Goals (Check all that apply):', margin, yPosition);
  yPosition += 10;
  const goals = [
    '☐ Web Development', '☐ Digital Marketing', '☐ AI Solutions', '☐ Strategy Consulting',
    '☐ Social Media Management', '☐ Recruitment Marketing', '☐ Business Process Automation',
    '☐ Data Analytics', '☐ Cloud Migration', '☐ Cybersecurity'
  ];
  
  let xPos = margin + 10;
  let columnWidth = 85;
  goals.forEach((goal, index) => {
    if (index > 0 && index % 2 === 0) {
      yPosition += 6;
      xPos = margin + 10;
    } else if (index % 2 === 1) {
      xPos = margin + 10 + columnWidth;
    }
    doc.text(goal, xPos, yPosition);
  });
  yPosition += 15;
  
  // Budget Range
  doc.text('Budget Range:', margin, yPosition);
  yPosition += 8;
  const budgets = ['☐ Less than $5,000', '☐ $5,000 - $15,000', '☐ $15,000 - $50,000', '☐ $50,000 - $100,000', '☐ More than $100,000'];
  budgets.forEach((budget) => {
    doc.text(budget, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 8;
  
  // Timeline
  doc.text('Timeline:', margin, yPosition);
  yPosition += 8;
  const timelines = ['☐ ASAP (Rush)', '☐ 1-3 months', '☐ 3-6 months', '☐ 6-12 months', '☐ Ongoing partnership'];
  timelines.forEach((timeline) => {
    doc.text(timeline, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 15;

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 30;
  }

  // Preferences Section
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Communication Preferences', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Preferred Contact Method
  doc.text('Preferred Contact Method:', margin, yPosition);
  yPosition += 8;
  const contactMethods = ['☐ Email', '☐ Phone', '☐ Both Email and Phone'];
  contactMethods.forEach((method) => {
    doc.text(method, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 8;
  
  // Communication Frequency
  doc.text('Communication Frequency:', margin, yPosition);
  yPosition += 8;
  const frequencies = ['☐ Daily', '☐ Weekly', '☐ Bi-weekly', '☐ Monthly'];
  frequencies.forEach((frequency) => {
    doc.text(frequency, margin + 10, yPosition);
    yPosition += 6;
  });
  yPosition += 15;
  
  // Terms and Conditions
  doc.text('☐ I accept the terms and conditions', margin, yPosition);
  yPosition += 8;
  doc.setFontSize(10);
  doc.text('By checking this box, you agree to our Terms of Service and Privacy Policy.', margin + 15, yPosition);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(41, 128, 185);
  doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('ƷBI - Business & Technology Solutions', margin, pageHeight - 15);
  doc.text('support@3bi.io | +1 (817) 757-2828', margin, pageHeight - 8);

  // Generate filename and save
  const fileName = `3BI_Blank_Onboarding_Form_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
