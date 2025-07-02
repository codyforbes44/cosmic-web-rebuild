
import { jsPDF } from 'jspdf';
import { PDF_COLORS, PDF_FONTS } from './pdfStyles';
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
