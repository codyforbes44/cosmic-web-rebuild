
import { jsPDF } from 'jspdf';

// Company colors and styling constants
export const PDF_COLORS = {
  primary: [41, 128, 185] as [number, number, number], // Blue
  secondary: [52, 73, 94] as [number, number, number], // Dark gray
  lightGray: [236, 240, 241] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  black: [0, 0, 0] as [number, number, number],
};

export const PDF_FONTS = {
  large: 18,
  medium: 16,
  normal: 12,
  small: 10,
  tiny: 8,
};

export const PDF_DIMENSIONS = {
  pageWidth: 210,
  headerHeight: 50,
  footerHeight: 35,
  logoWidth: 30,
  logoHeight: 20,
  qrCodeSize: 40,
};

export const applyHeaderStyle = (doc: jsPDF) => {
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, 0, PDF_DIMENSIONS.pageWidth, PDF_DIMENSIONS.headerHeight, 'F');
};

export const applyFooterStyle = (doc: jsPDF, pageHeight: number) => {
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, pageHeight - PDF_DIMENSIONS.footerHeight, PDF_DIMENSIONS.pageWidth, PDF_DIMENSIONS.footerHeight, 'F');
};

export const addCompanyLogo = (doc: jsPDF) => {
  try {
    // Logo placeholder
    doc.setFillColor(...PDF_COLORS.white);
    doc.rect(15, 10, PDF_DIMENSIONS.logoWidth, PDF_DIMENSIONS.logoHeight, 'F');
    doc.setTextColor(...PDF_COLORS.primary);
    doc.setFontSize(PDF_FONTS.tiny);
    doc.text('ƷBɪ LOGO', 20, 22);
  } catch (error) {
    console.log('Logo loading error:', error);
  }
};

export const addQRCodePlaceholder = (doc: jsPDF, yPosition: number) => {
  doc.setFillColor(...PDF_COLORS.lightGray);
  doc.rect(20, yPosition, PDF_DIMENSIONS.qrCodeSize, PDF_DIMENSIONS.qrCodeSize, 'F');
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(PDF_FONTS.tiny);
  doc.text('QR CODE', 35, yPosition + 22);
  doc.text('PLACEHOLDER', 30, yPosition + 28);
};
