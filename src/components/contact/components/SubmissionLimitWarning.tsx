
interface SubmissionLimitWarningProps {
  submissionCount: number;
}

const SubmissionLimitWarning = ({ submissionCount }: SubmissionLimitWarningProps) => {
  if (submissionCount < 5) return null;

  return (
    <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-md">
      <p className="text-yellow-200 text-sm">
        You've reached the maximum number of submissions. Please contact us directly if you need immediate assistance.
      </p>
    </div>
  );
};

export default SubmissionLimitWarning;
