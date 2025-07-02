
import { jsPDF } from 'jspdf';
import { applyHeaderStyle, applyFooterStyle } from './pdf/pdfStyles';
import { 
  addHeaderContent, 
  addClientInformation, 
  addServiceInformation, 
  addServiceDetails, 
  addPersonalMessage, 
  addPaymentInformation, 
  addFooterContent 
} from './pdf/pdfContent';

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
  
  // Apply header styling and content
  applyHeaderStyle(doc);
  addHeaderContent(doc, data);
  
  // Add main content sections
  const clientSectionEnd = addClientInformation(doc, data);
  const serviceSectionEnd = addServiceInformation(doc, data, clientSectionEnd);
  const detailsSectionEnd = addServiceDetails(doc, data, serviceSectionEnd);
  const messageSectionEnd = addPersonalMessage(doc, data, detailsSectionEnd);
  addPaymentInformation(doc, messageSectionEnd);
  
  // Apply footer styling and content
  const pageHeight = doc.internal.pageSize.height;
  applyFooterStyle(doc, pageHeight);
  addFooterContent(doc);
  
  // Save the PDF
  const fileName = `3BI_${data.serviceName.replace(/\s+/g, '_')}_Proposal_${data.contactName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
