import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

interface ChatInteraction {
  id: string;
  session_id: string;
  user_name: string | null;
  user_email: string | null;
  message: string;
  response: string;
  created_at: string;
}

interface ChatInteractionsAnalyticsProps {
  chatData: ChatInteraction[];
}

const ChatInteractionsAnalytics: React.FC<ChatInteractionsAnalyticsProps> = ({ chatData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter chat data based on search term
  const filteredData = chatData.filter(interaction => 
    (interaction.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
     interaction.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (interaction.user_name && interaction.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (interaction.user_email && interaction.user_email.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  
  // Prepare data for charts
  const chatsByDay = chatData.reduce((acc, interaction) => {
    const date = new Date(interaction.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    acc[date]++;
    return acc;
  }, {} as Record<string, number>);
  
  const chatChartData = Object.entries(chatsByDay).map(([date, count]) => ({
    date,
    interactions: count
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Chat Interactions</h2>
        <Input
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 bg-gray-800/50 border-gray-700 text-white"
        />
      </div>
      
      {/* Chat Interactions Over Time Chart */}
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Chat Interactions Over Time</CardTitle>
          <CardDescription className="text-gray-400">
            Number of chat interactions per day
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chatChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
              <Bar dataKey="interactions" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Chat Interactions Table */}
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Chat Conversation History</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredData.length} conversation{filteredData.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Message</TableHead>
                  <TableHead className="text-gray-300">Response</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-gray-800/30">
                {filteredData.length > 0 ? (
                  filteredData.map(interaction => (
                    <TableRow key={interaction.id} className="border-t border-gray-700">
                      <TableCell className="text-gray-300">
                        {interaction.user_name || 'Anonymous'}
                        {interaction.user_email && (
                          <div className="text-xs text-gray-400">{interaction.user_email}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">{interaction.message}</TableCell>
                      <TableCell className="text-gray-300">{interaction.response}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(interaction.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-400 py-4">
                      No chat interactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInteractionsAnalytics;
