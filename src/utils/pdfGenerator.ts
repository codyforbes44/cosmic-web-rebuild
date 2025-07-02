
import { jsPDF } from 'jspdf';

interface PDFData {
  contactName: string;
  email: string;
  phone?: string;
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  date: string;
  personalMessage?: string;
  serviceName: string;
  servicePrice: string;
}

export const generatePDF = async (data: PDFData) => {
  const doc = new jsPDF();
  
  // Company colors and styling
  const primaryColor = [41, 128, 185]; // Blue
  const secondaryColor = [52, 73, 94]; // Dark gray
  const lightGray = [236, 240, 241];
  
  // Header with company branding
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Add company logo
  try {
    // Note: In a real implementation, you would load the image properly
    // For now, we'll add a placeholder that represents the logo area
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 10, 30, 20, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(8);
    doc.text('ƷBɪ LOGO', 20, 22);
  } catch (error) {
    console.log('Logo loading error:', error);
  }
  
  // Company information
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Ʒʙɪ | Business Intelligence : AI Solutions', 55, 20);
  
  doc.setFontSize(10);
  doc.text('Email: support@3bi.io', 55, 28);
  doc.text('Phone: +1 (817) 757-2828', 55, 34);
  doc.text('Location: Texas, USA', 55, 40);
  
  // Proposal title
  doc.setFontSize(16);
  doc.text(`Professional Proposal for ${data.contactName}`, 20, 45);
  
  // Client Information Section
  let yPosition = 70;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text('Client Information', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.text(`Contact: ${data.contactName}`, 20, yPosition);
  yPosition += 5;
  doc.text(`Email: ${data.email}`, 20, yPosition);
  
  if (data.phone) {
    yPosition += 5;
    doc.text(`Phone: ${data.phone}`, 20, yPosition);
  }
  
  if (data.companyName) {
    yPosition += 5;
    doc.text(`Company: ${data.companyName}`, 20, yPosition);
  }
  
  // Address section
  if (data.address || data.city || data.state || data.zipCode) {
    yPosition += 5;
    const addressParts = [];
    if (data.address) addressParts.push(data.address);
    if (data.city) addressParts.push(data.city);
    if (data.state) addressParts.push(data.state);
    if (data.zipCode) addressParts.push(data.zipCode);
    doc.text(`Address: ${addressParts.join(', ')}`, 20, yPosition);
  }
  
  yPosition += 5;
  doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`, 20, yPosition);
  
  // Service Information
  yPosition += 20;
  doc.setFontSize(16);
  doc.text('Proposed Service', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.text(`Service: ${data.serviceName}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Investment: ${data.servicePrice}`, 20, yPosition);
  
  // Service Details Section
  yPosition += 20;
  doc.setFontSize(14);
  doc.text('What\'s Included:', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  
  // Service-specific benefits
  const serviceDetails = getServiceDetails(data.serviceName);
  serviceDetails.forEach((detail, index) => {
    doc.text(`• ${detail}`, 25, yPosition);
    yPosition += 5;
  });
  
  // Personal Message
  if (data.personalMessage) {
    yPosition += 15;
    doc.setFontSize(14);
    doc.text('Personal Message:', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    const splitMessage = doc.splitTextToSize(data.personalMessage, 170);
    doc.text(splitMessage, 20, yPosition);
    yPosition += splitMessage.length * 5;
  }
  
  // QR Code placeholder section
  yPosition += 20;
  doc.setFontSize(14);
  doc.text('Payment Information:', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.text('Scan the QR code below to proceed with payment:', 20, yPosition);
  
  // QR Code placeholder
  yPosition += 10;
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, yPosition, 40, 40, 'F');
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text('QR CODE', 35, yPosition + 22);
  doc.text('PLACEHOLDER', 30, yPosition + 28);
  
  // Payment link text
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('Stripe Payment Link:', 70, yPosition + 10);
  doc.text('https://stripe.com/payment-link', 70, yPosition + 20);
  doc.text('(QR code will redirect here)', 70, yPosition + 30);
  
  // Footer with company branding
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, pageHeight - 35, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Ʒʙɪ | Business Intelligence : AI Solutions', 20, pageHeight - 25);
  doc.setFontSize(10);
  doc.text('support@3bi.io | +1 (817) 757-2828 | Texas, USA', 20, pageHeight - 15);
  doc.text('Thank you for considering our AI solutions!', 20, pageHeight - 5);
  
  // Save the PDF
  const fileName = `3BI_${data.serviceName.replace(/\s+/g, '_')}_Proposal_${data.contactName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

const getServiceDetails = (serviceName: string): string[] => {
  const details: { [key: string]: string[] } = {
    'Digital Marketing': [
      'Comprehensive digital strategy development',
      'Search engine optimization (SEO)',
      'Pay-per-click (PPC) advertising management',
      'Social media marketing campaigns',
      'Content marketing strategy',
      'Analytics and performance reporting',
      'Monthly strategy consultations'
    ],
    'Web Development': [
      'Custom website design and development',
      'Responsive mobile-first design',
      'Content management system (CMS)',
      'E-commerce functionality (if applicable)',
      'Search engine optimization',
      'Security implementation',
      '3 months of maintenance and support'
    ],
    'AI Solutions': [
      'AI strategy consultation and planning',
      'Custom AI model development',
      'Machine learning implementation',
      'Data analysis and insights',
      'AI integration with existing systems',
      'Training and documentation',
      'Ongoing support and optimization'
    ],
    'Strategy Consulting': [
      'Business strategy assessment',
      'Market analysis and research',
      'Competitive landscape evaluation',
      'Strategic planning and roadmap',
      'Implementation guidance',
      'Monthly progress reviews',
      'Strategic recommendations report'
    ],
    'Social Media Management': [
      'Social media strategy development',
      'Content creation and curation',
      'Daily posting and engagement',
      'Community management',
      'Social media advertising',
      'Analytics and reporting',
      'Monthly performance reviews'
    ],
    'Recruitment Marketing': [
      'Recruitment strategy development',
      'Employer branding initiatives',
      'Job posting optimization',
      'Candidate sourcing campaigns',
      'Recruitment funnel optimization',
      'Performance tracking and analytics',
      'Monthly recruitment reports'
    ]
  };
  
  return details[serviceName] || [
    'Customized service delivery',
    'Professional consultation',
    'Regular progress updates',
    'Dedicated account management'
  ];
};
