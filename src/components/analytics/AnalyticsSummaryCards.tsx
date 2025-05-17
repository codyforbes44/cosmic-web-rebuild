
import React from 'react';
import { 
  Users, FileText, MessageSquare, CalendarClock, Globe, Mail 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisitorData, FormSubmissionData } from '@/types/tracking';

interface AnalyticsSummaryCardsProps {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  chatData?: any[]; // Chat interaction data (optional)
}

const AnalyticsSummaryCards: React.FC<AnalyticsSummaryCardsProps> = ({ 
  visitorData, formData, chatData = [] 
}) => {
  // Get unique visitors count
  const uniqueVisitors = new Set(visitorData.map(visitor => visitor.session_id)).size;
  
  // Calculate recent visitors (last 24 hours)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const recentVisitors = visitorData.filter(
    visitor => new Date(visitor.created_at) > yesterday
  ).length;
  
  // Count form submissions
  const formSubmissions = formData.length;

  // Count chat interactions
  const chatInteractions = chatData.length;
  
  // Calculate unique chat sessions
  const uniqueChatSessions = new Set(chatData.map(chat => chat.session_id)).size;
  
  // Calculate average messages per chat session
  const avgMessagesPerSession = uniqueChatSessions > 0 
    ? Math.round((chatInteractions / uniqueChatSessions) * 10) / 10
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Total Visitors</CardTitle>
          <Users className="h-5 w-5 text-purple-400" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{uniqueVisitors}</p>
          <p className="text-sm text-gray-400">
            {recentVisitors} in the last 24 hours
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Form Submissions</CardTitle>
          <FileText className="h-5 w-5 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formSubmissions}</p>
          <p className="text-sm text-gray-400">
            From {formData.length > 0 
              ? new Date(formData[formData.length - 1].created_at).toLocaleDateString() 
              : 'N/A'}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Chat Interactions</CardTitle>
          <MessageSquare className="h-5 w-5 text-green-400" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{chatInteractions}</p>
          <p className="text-sm text-gray-400">
            {uniqueChatSessions} unique chat sessions
          </p>
        </CardContent>
      </Card>
      
      {/* Additional metrics that could be valuable */}
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Avg. Messages/Session</CardTitle>
          <CalendarClock className="h-5 w-5 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{avgMessagesPerSession}</p>
          <p className="text-sm text-gray-400">
            Messages per chat session
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Top Page</CardTitle>
          <Globe className="h-5 w-5 text-blue-400" />
        </CardHeader>
        <CardContent>
          {visitorData.length > 0 ? (
            <>
              <p className="text-xl font-bold truncate">
                {(() => {
                  const pages = visitorData.reduce((acc, visitor) => {
                    acc[visitor.path] = (acc[visitor.path] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  const topPage = Object.entries(pages).sort((a, b) => b[1] - a[1])[0];
                  return topPage ? topPage[0] : 'N/A';
                })()}
              </p>
              <p className="text-sm text-gray-400">Most visited page</p>
            </>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <Mail className="h-5 w-5 text-red-400" />
        </CardHeader>
        <CardContent>
          {visitorData.length > 0 || formData.length > 0 || chatData.length > 0 ? (
            <>
              <p className="text-xl font-bold">
                {(() => {
                  const allDates = [
                    ...visitorData.map(v => new Date(v.created_at)),
                    ...formData.map(f => new Date(f.created_at)),
                    ...chatData.map(c => new Date(c.created_at))
                  ];
                  const mostRecent = new Date(Math.max(...allDates.map(d => d.getTime())));
                  return mostRecent.toLocaleString();
                })()}
              </p>
              <p className="text-sm text-gray-400">Last activity on site</p>
            </>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSummaryCards;
