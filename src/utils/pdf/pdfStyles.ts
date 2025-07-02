
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
};

export const applyHeaderStyle = (doc: jsPDF) => {
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, 0, PDF_DIMENSIONS.pageWidth, PDF_DIMENSIONS.headerHeight, 'F');
};

export const applyFooterStyle = (doc: jsPDF, pageHeight: number) => {
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, pageHeight - PDF_DIMENSIONS.footerHeight, PDF_DIMENSIONS.pageWidth, PDF_DIMENSIONS.footerHeight, 'F');
};
