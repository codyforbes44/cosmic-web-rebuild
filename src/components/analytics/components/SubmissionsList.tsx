
import React from "react";
import { FileText } from "lucide-react";
import { FormSubmission } from "../hooks/useFormSubmissions";
import SubmissionItem from "./SubmissionItem";

interface SubmissionsListProps {
  submissions: FormSubmission[] | undefined;
  onViewSubmission: (submission: FormSubmission) => void;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions, onViewSubmission }) => {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
        <p className="text-gray-400">No form submissions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      <h4 className="text-sm font-medium text-gray-300 mb-3">All Submissions</h4>
      {submissions.map((submission) => (
        <SubmissionItem
          key={submission.id}
          submission={submission}
          onView={onViewSubmission}
        />
      ))}
    </div>
  );
};

export default SubmissionsList;
