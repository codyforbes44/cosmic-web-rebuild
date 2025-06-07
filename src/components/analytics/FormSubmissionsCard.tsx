
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useFormSubmissions, FormSubmission } from "./hooks/useFormSubmissions";
import SubmissionModal from "./SubmissionModal";
import SubmissionStats from "./components/SubmissionStats";
import SubmissionsList from "./components/SubmissionsList";

const FormSubmissionsCard = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: submissions, isLoading, error } = useFormSubmissions();

  const handleViewSubmission = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  if (isLoading) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Form Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-red-500/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Form Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300">Error loading form submissions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Form Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionStats submissions={submissions} />
          <SubmissionsList 
            submissions={submissions} 
            onViewSubmission={handleViewSubmission} 
          />
        </CardContent>
      </Card>

      <SubmissionModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FormSubmissionsCard;
