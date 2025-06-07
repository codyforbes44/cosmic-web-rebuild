
import React from "react";
import { MessageSquare, FileText } from "lucide-react";
import { FormSubmission } from "../hooks/useFormSubmissions";

interface SubmissionStatsProps {
  submissions: FormSubmission[] | undefined;
}

const SubmissionStats: React.FC<SubmissionStatsProps> = ({ submissions }) => {
  const contactCount = submissions?.filter(s => s.type === 'contact').length || 0;
  const quoteCount = submissions?.filter(s => s.type === 'quote').length || 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <MessageSquare className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">{contactCount}</div>
        <div className="text-sm text-gray-400">Contact Forms</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <FileText className="w-8 h-8 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white">{quoteCount}</div>
        <div className="text-sm text-gray-400">Quote Requests</div>
      </div>
    </div>
  );
};

export default SubmissionStats;
