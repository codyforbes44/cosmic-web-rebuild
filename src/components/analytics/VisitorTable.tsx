
import React, { useState } from "react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell, TableCaption 
} from "@/components/ui/table";
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, MonitorSmartphone, Clock, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisitorTableProps {
  visitorData: any[];
  isLoading?: boolean;
  simplified?: boolean;
}

const VisitorTable: React.FC<VisitorTableProps> = ({ 
  visitorData, 
  isLoading,
  simplified = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>("visit_timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;
  
  // Sort and pagination logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Sort data
  const sortedData = [...visitorData].sort((a, b) => {
    if (!a[sortField] && !b[sortField]) return 0;
    if (!a[sortField]) return 1;
    if (!b[sortField]) return -1;
    
    const valA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
    const valB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];
    
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Generate page numbers for pagination
  const generatePaginationItems = () => {
    let items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // If we're beyond page 3, show ellipsis
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // If not close to last page, show ellipsis
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  const renderSortableHeader = (field: string, label: string, icon?: React.ReactNode) => (
    <TableHead>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center space-x-1 font-medium text-gray-400 hover:text-white px-0"
        onClick={() => handleSort(field)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        <span>{label}</span>
        <ArrowUpDown size={14} className="ml-1" />
      </Button>
    </TableHead>
  );
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // For simplified table (visitors tab)
  if (simplified) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400">Time</th>
              <th className="text-left py-3 px-4 text-gray-400">Page</th>
              <th className="text-left py-3 px-4 text-gray-400">Location</th>
              <th className="text-left py-3 px-4 text-gray-400">Device</th>
              <th className="text-left py-3 px-4 text-gray-400">Source</th>
            </tr>
          </thead>
          <tbody>
            {visitorData.length > 0 ? (
              visitorData.map((visitor, index) => {
                const visitUrl = visitor.page_url ? new URL(visitor.page_url) : null;
                const visitPath = visitUrl ? visitUrl.pathname : 'Unknown';
                const visitTime = visitor.visit_timestamp ? new Date(visitor.visit_timestamp).toLocaleString() : 'Unknown';
                const location = visitor.country ? `${visitor.city ? visitor.city + ', ' : ''}${visitor.country}` : 'Unknown';
                const source = visitor.utm_source || (visitor.referrer ? 'Referral' : 'Direct');
                
                return (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-sm text-gray-300">{visitTime}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      <span className="truncate block max-w-[140px]" title={visitPath}>
                        {visitPath}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">{location}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <MonitorSmartphone size={14} className="mr-1" />
                        <span>{visitor.device_type || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-white/5">
                        {source}
                      </Badge>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No visitor data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
  // Full featured table for the data tab
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-white/10 backdrop-blur-sm">
        <Table>
          <TableCaption>Full visitor data collected from tracking</TableCaption>
          <TableHeader className="bg-black/20">
            <TableRow>
              {renderSortableHeader("visit_timestamp", "Date & Time", <Calendar size={14} />)}
              {renderSortableHeader("page_url", "Page")}
              {renderSortableHeader("country", "Location", <Globe size={14} />)}
              {renderSortableHeader("device_type", "Device", <MonitorSmartphone size={14} />)}
              {renderSortableHeader("time_on_page", "Time on Page", <Clock size={14} />)}
              {renderSortableHeader("utm_source", "Source")}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((visitor, index) => {
                const visitUrl = visitor.page_url ? new URL(visitor.page_url) : null;
                const visitPath = visitUrl ? visitUrl.pathname : 'Unknown';
                const visitTime = visitor.visit_timestamp ? new Date(visitor.visit_timestamp).toLocaleString() : 'Unknown';
                const location = visitor.country ? `${visitor.city ? visitor.city + ', ' : ''}${visitor.region ? visitor.region + ', ' : ''}${visitor.country}` : 'Unknown';
                const timeOnPage = visitor.time_on_page ? `${visitor.time_on_page} sec` : 'Unknown';
                const source = visitor.utm_source || (visitor.referrer ? 'Referral' : 'Direct');
                
                return (
                  <TableRow key={index} className="border-b border-white/5">
                    <TableCell className="text-sm text-gray-300">
                      <span className="text-xs text-gray-400">{visitTime.split(',')[0]}</span><br />
                      {visitTime.split(',')[1]}
                    </TableCell>
                    <TableCell className="text-sm text-gray-300">
                      <span className="truncate block max-w-[140px]" title={visitPath}>
                        {visitPath}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-300">{location}</TableCell>
                    <TableCell className="text-sm text-gray-300">
                      <div className="flex items-center">
                        <MonitorSmartphone size={14} className="mr-1" />
                        <span>{visitor.device_type || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-300">{timeOnPage}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white/5">
                        {source}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                  No visitor data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {generatePaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default VisitorTable;
