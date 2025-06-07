
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Calendar, Eye } from "lucide-react";
import { formatDateDisplay } from "@/utils/timezone";
import { FormSubmission } from "../hooks/useFormSubmissions";

interface SubmissionItemProps {
  submission: FormSubmission;
  onView: (submission: FormSubmission) => void;
}

const SubmissionItem: React.FC<SubmissionItemProps> = ({ submission, onView }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-space-dark-blue/50 rounded-lg border border-gray-700">
      <div className="flex items-center gap-3 flex-1">
        {submission.type === 'contact' ? (
          <MessageSquare className="w-4 h-4 text-blue-400" />
        ) : (
          <FileText className="w-4 h-4 text-green-400" />
        )}
        <div className="flex-1">
          <div className="text-sm text-white">
            {submission.type === 'contact' ? submission.name : submission.full_name}
          </div>
          <div className="text-xs text-gray-400">
            {submission.type === 'contact' ? submission.subject : submission.service_type}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDateDisplay(submission.created_at)}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onView(submission)}
          className="bg-transparent border-accent/50 text-accent hover:bg-accent-hover/10 focus:ring-2 focus:ring-accent"
        >
          <Eye className="w-3 h-3 mr-1" />
          View
        </Button>
      </div>
    </div>
  );
};

export default SubmissionItem;
