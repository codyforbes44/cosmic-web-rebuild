
import { jsPDF } from 'jspdf';
import { PDF_COLORS, PDF_FONTS } from './pdfStyles';

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
  // Company information (no logo)
  doc.setTextColor(...PDF_COLORS.white);
  doc.setFontSize(PDF_FONTS.large);
  doc.text('3BI', 20, 20);
  
  doc.setFontSize(PDF_FONTS.small);
  doc.text('Email: support@3bi.io', 20, 28);
  doc.text('Phone: +1 (817) 757-2828', 20, 34);
  
  // Proposal title
  doc.setFontSize(PDF_FONTS.medium);
  doc.text(`Professional Proposal for ${data.contactName}`, 20, 40);
};
