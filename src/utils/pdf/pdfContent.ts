
import { jsPDF } from 'jspdf';
import { PDF_COLORS, PDF_FONTS, addCompanyLogo, addQRCodePlaceholder } from './pdfStyles';
import { getServiceDetails } from './serviceDetails';

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

export const addHeaderContent = (doc: jsPDF, data: PDFData) => {
  // Add company logo
  addCompanyLogo(doc);
  
  // Company information
  doc.setTextColor(...PDF_COLORS.white);
  doc.setFontSize(PDF_FONTS.large);
  doc.text('Ʒʙɪ | Business Intelligence : AI Solutions', 55, 20);
  
  doc.setFontSize(PDF_FONTS.small);
  doc.text('Email: support@3bi.io', 55, 28);
  doc.text('Phone: +1 (817) 757-2828', 55, 34);
  doc.text('Location: Texas, USA', 55, 40);
  
  // Proposal title
  doc.setFontSize(PDF_FONTS.medium);
  doc.text(`Professional Proposal for ${data.contactName}`, 20, 45);
};

export const addClientInformation = (doc: jsPDF, data: PDFData): number => {
  let yPosition = 70;
  doc.setTextColor(...PDF_COLORS.black);
  doc.setFontSize(PDF_FONTS.medium);
  doc.text('Client Information', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(PDF_FONTS.small);
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
  
  return yPosition;
};

export const addServiceInformation = (doc: jsPDF, data: PDFData, startY: number): number => {
  let yPosition = startY + 20;
  doc.setFontSize(PDF_FONTS.medium);
  doc.text('Proposed Service', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(PDF_FONTS.normal);
  doc.text(`Service: ${data.serviceName}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Investment: ${data.servicePrice}`, 20, yPosition);
  
  return yPosition;
};

export const addServiceDetails = (doc: jsPDF, data: PDFData, startY: number): number => {
  let yPosition = startY + 20;
  doc.setFontSize(14);
  doc.text('What\'s Included:', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(PDF_FONTS.small);
  
  const serviceDetails = getServiceDetails(data.serviceName);
  serviceDetails.forEach((detail) => {
    doc.text(`• ${detail}`, 25, yPosition);
    yPosition += 5;
  });
  
  return yPosition;
};

export const addPersonalMessage = (doc: jsPDF, data: PDFData, startY: number): number => {
  if (!data.personalMessage) return startY;
  
  let yPosition = startY + 15;
  doc.setFontSize(14);
  doc.text('Personal Message:', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(PDF_FONTS.small);
  const splitMessage = doc.splitTextToSize(data.personalMessage, 170);
  doc.text(splitMessage, 20, yPosition);
  yPosition += splitMessage.length * 5;
  
  return yPosition;
};

export const addPaymentInformation = (doc: jsPDF, startY: number): number => {
  let yPosition = startY + 20;
  doc.setFontSize(14);
  doc.text('Payment Information:', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(PDF_FONTS.small);
  doc.text('Scan the QR code below to proceed with payment:', 20, yPosition);
  
  // QR Code placeholder
  yPosition += 10;
  addQRCodePlaceholder(doc, yPosition);
  
  // Payment link text
  doc.setTextColor(...PDF_COLORS.black);
  doc.setFontSize(PDF_FONTS.small);
  doc.text('Stripe Payment Link:', 70, yPosition + 10);
  doc.text('https://stripe.com/payment-link', 70, yPosition + 20);
  doc.text('(QR code will redirect here)', 70, yPosition + 30);
  
  return yPosition + 40;
};

export const addFooterContent = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setTextColor(...PDF_COLORS.white);
  doc.setFontSize(PDF_FONTS.normal);
  doc.text('Ʒʙɪ | Business Intelligence : AI Solutions', 20, pageHeight - 25);
  doc.setFontSize(PDF_FONTS.small);
  doc.text('support@3bi.io | +1 (817) 757-2828 | Texas, USA', 20, pageHeight - 15);
  doc.text('Thank you for considering our AI solutions!', 20, pageHeight - 5);
};
