
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { VisitorData } from '@/types/tracking';

interface VisitorMetadataTableProps {
  visitorData: VisitorData[];
}

const VisitorMetadataTable: React.FC<VisitorMetadataTableProps> = ({ visitorData }) => {
  // Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  // Filter out visits from Lovable domains
  const filteredVisitorData = useMemo(() => {
    return visitorData.filter(visitor => {
      // Check if referrer or path contains lovable domain
      const referrer = visitor.referrer?.toLowerCase() || '';
      const path = visitor.path?.toLowerCase() || '';
      return !referrer.includes('lovable.') && !path.includes('lovable.');
    });
  }, [visitorData]);
  
  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentVisitorData = filteredVisitorData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredVisitorData.length / rowsPerPage);
  
  // Function to export visitor data as CSV
  const exportToCsv = () => {
    if (!filteredVisitorData.length) return;
    
    // Create CSV headers
    const headers = [
      'Session ID',
      'IP Address', 
      'Browser', 
      'OS', 
      'Device Type', 
      'Screen Size', 
      'Path', 
      'Referrer', 
      'Date'
    ].join(',');
    
    // Format data rows
    const rows = filteredVisitorData.map(visitor => [
      visitor.session_id,
      visitor.ip_address || 'Unknown',
      visitor.browser || 'Unknown',
      visitor.os || 'Unknown',
      visitor.device_type || 'Unknown',
      `${visitor.screen_width}x${visitor.screen_height}`,
      visitor.path,
      visitor.referrer,
      new Date(visitor.created_at).toLocaleString()
    ].join(','));
    
    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `visitor_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Visitor Metadata Details</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed information about each visitor session (excluding Lovable visits)
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportToCsv}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/70 bg-gray-800/40">
                <TableHead>Browser</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Screen Size</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentVisitorData.length > 0 ? (
                currentVisitorData.map((visitor, index) => (
                  <TableRow key={index} className="hover:bg-gray-800/70">
                    <TableCell>{visitor.browser || 'Unknown'}</TableCell>
                    <TableCell>{visitor.os || 'Unknown'}</TableCell>
                    <TableCell>{visitor.device_type || 'Unknown'}</TableCell>
                    <TableCell>{visitor.ip_address || 'Unknown'}</TableCell>
                    <TableCell>{`${visitor.screen_width || 0}x${visitor.screen_height || 0}`}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{visitor.path}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{visitor.referrer}</TableCell>
                    <TableCell>{new Date(visitor.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">No visitor data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredVisitorData.length > rowsPerPage && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorMetadataTable;
