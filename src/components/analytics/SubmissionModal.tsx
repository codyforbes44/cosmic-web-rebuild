
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Calendar, User, Mail, Phone, Building, ClipboardList } from "lucide-react";
import { formatDateDisplay } from "@/utils/timezone";
import { FormSubmission } from "./hooks/useFormSubmissions";

interface SubmissionModalProps {
  submission: FormSubmission | null;
  isOpen: boolean;
  onClose: () => void;
}

const getSubmissionIcon = (type: FormSubmission['type']) => {
  switch (type) {
    case 'contact':
      return <MessageSquare className="w-5 h-5 text-blue-400" />;
    case 'quote':
      return <FileText className="w-5 h-5 text-green-400" />;
    case 'onboarding':
      return <ClipboardList className="w-5 h-5 text-purple-400" />;
  }
};

const getSubmissionLabel = (type: FormSubmission['type']) => {
  switch (type) {
    case 'contact':
      return 'Contact Form';
    case 'quote':
      return 'Quote Request';
    case 'onboarding':
      return 'Onboarding';
  }
};

const getSubmissionBadgeClass = (type: FormSubmission['type']) => {
  switch (type) {
    case 'contact':
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case 'quote':
      return "bg-green-500/20 text-green-400 border-green-500/50";
    case 'onboarding':
      return "bg-purple-500/20 text-purple-400 border-purple-500/50";
  }
};

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  submission,
  isOpen,
  onClose,
}) => {
  if (!submission) return null;

  const displayName = submission.type === 'contact' ? submission.name : submission.full_name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-space-deep-blue border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {getSubmissionIcon(submission.type)}
            {getSubmissionLabel(submission.type)} Submission
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <Badge className={getSubmissionBadgeClass(submission.type)}>
              {getSubmissionLabel(submission.type)}
            </Badge>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDateDisplay(submission.created_at)}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-space-dark-blue/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <p className="text-white">{displayName || 'N/A'}</p>
              </div>
              {submission.email && (
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </label>
                  <p className="text-white">{submission.email}</p>
                </div>
              )}
              {submission.phone && (
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </label>
                  <p className="text-white">{submission.phone}</p>
                </div>
              )}
              {submission.company_name && (
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    Company
                  </label>
                  <p className="text-white">{submission.company_name}</p>
                </div>
              )}
            </div>
          </div>

          {/* Submission Details */}
          <div className="bg-space-dark-blue/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-white font-medium mb-3">Submission Details</h3>
            <div className="space-y-4">
              {submission.type === 'contact' ? (
                <>
                  {submission.subject && (
                    <div>
                      <label className="text-sm text-gray-400">Subject</label>
                      <p className="text-white">{submission.subject}</p>
                    </div>
                  )}
                  {submission.message && (
                    <div>
                      <label className="text-sm text-gray-400">Message</label>
                      <p className="text-white whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  )}
                </>
              ) : submission.type === 'quote' ? (
                <>
                  {submission.service_type && (
                    <div>
                      <label className="text-sm text-gray-400">Service Type</label>
                      <p className="text-white">{submission.service_type}</p>
                    </div>
                  )}
                  {submission.project_description && (
                    <div>
                      <label className="text-sm text-gray-400">Project Description</label>
                      <p className="text-white whitespace-pre-wrap">{submission.project_description}</p>
                    </div>
                  )}
                  {submission.budget && (
                    <div>
                      <label className="text-sm text-gray-400">Budget</label>
                      <p className="text-white">{submission.budget}</p>
                    </div>
                  )}
                  {submission.timeline && (
                    <div>
                      <label className="text-sm text-gray-400">Timeline</label>
                      <p className="text-white">{submission.timeline}</p>
                    </div>
                  )}
                  {submission.terms_accepted !== undefined && (
                    <div>
                      <label className="text-sm text-gray-400">Terms Accepted</label>
                      <p className="text-white">{submission.terms_accepted ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </>
              ) : (
                /* Onboarding submission */
                <>
                  {submission.budget && (
                    <div>
                      <label className="text-sm text-gray-400">Budget</label>
                      <p className="text-white">{submission.budget}</p>
                    </div>
                  )}
                  {submission.timeline && (
                    <div>
                      <label className="text-sm text-gray-400">Timeline</label>
                      <p className="text-white">{submission.timeline}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
