
import { jsPDF } from 'jspdf';
import { PDF_COLORS, PDF_FONTS } from './pdfStyles';

export const addFooterContent = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setTextColor(...PDF_COLORS.white);
  doc.setFontSize(PDF_FONTS.normal);
  doc.text('3BI', 20, pageHeight - 25);
  doc.setFontSize(PDF_FONTS.small);
  doc.text('support@3bi.io | +1 (817) 757-2828 | Texas, USA', 20, pageHeight - 15);
  doc.text('Thank you for considering our AI solutions!', 20, pageHeight - 5);
};
