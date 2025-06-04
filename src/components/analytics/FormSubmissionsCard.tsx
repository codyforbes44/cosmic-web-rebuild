
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FormSubmission {
  id: string;
  created_at: string;
  type: 'contact' | 'quote';
  name?: string;
  full_name?: string;
  subject?: string;
  service_type?: string;
}

const FormSubmissionsCard = () => {
  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ['form-submissions'],
    queryFn: async () => {
      // Fetch contact submissions
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('id, created_at, name, subject')
        .order('created_at', { ascending: false })
        .limit(50);

      if (contactError) throw contactError;

      // Fetch quote requests
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .select('id, created_at, full_name, service_type')
        .order('created_at', { ascending: false })
        .limit(50);

      if (quoteError) throw quoteError;

      // Combine and format submissions
      const combined: FormSubmission[] = [
        ...(contactData || []).map(item => ({
          id: item.id,
          created_at: item.created_at,
          type: 'contact' as const,
          name: item.name,
          subject: item.subject,
        })),
        ...(quoteData || []).map(item => ({
          id: item.id,
          created_at: item.created_at,
          type: 'quote' as const,
          full_name: item.full_name,
          service_type: item.service_type,
        })),
      ];

      // Sort by date
      return combined.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  });

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

  const contactCount = submissions?.filter(s => s.type === 'contact').length || 0;
  const quoteCount = submissions?.filter(s => s.type === 'quote').length || 0;

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Form Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
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

        {submissions && submissions.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Submissions</h4>
            {submissions.slice(0, 10).map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-3 bg-space-dark-blue/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  {submission.type === 'contact' ? (
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-green-400" />
                  )}
                  <div>
                    <div className="text-sm text-white">
                      {submission.type === 'contact' ? submission.name : submission.full_name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {submission.type === 'contact' ? submission.subject : submission.service_type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(submission.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No form submissions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormSubmissionsCard;
