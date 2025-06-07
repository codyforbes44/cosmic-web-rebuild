
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Copy, 
  AlertTriangle, 
  Clock, 
  Eye, 
  CheckCircle, 
  XCircle,
  Shield,
  MapPin,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  details?: {
    ipAddress?: string;
    userAgent?: string;
    userId?: string;
    endpoint?: string;
    attemptCount?: number;
    location?: string;
  };
}

interface SecurityErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: SecurityEvent | null;
}

export const SecurityErrorModal: React.FC<SecurityErrorModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'investigating': return <Eye className="h-4 w-4 text-blue-400" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleCopyDetails = async () => {
    const detailsText = `
Security Event Details:
-----------------------
ID: ${event.id}
Type: ${event.type}
Severity: ${event.severity}
Status: ${event.status}
Timestamp: ${event.timestamp}
Description: ${event.description}

Technical Details:
${event.details?.ipAddress ? `IP Address: ${event.details.ipAddress}` : ''}
${event.details?.userAgent ? `User Agent: ${event.details.userAgent}` : ''}
${event.details?.userId ? `User ID: ${event.details.userId}` : ''}
${event.details?.endpoint ? `Endpoint: ${event.details.endpoint}` : ''}
${event.details?.attemptCount ? `Attempt Count: ${event.details.attemptCount}` : ''}
${event.details?.location ? `Location: ${event.details.location}` : ''}
    `.trim();

    try {
      await navigator.clipboard.writeText(detailsText);
      setCopied(true);
      toast({
        title: "Details copied",
        description: "Security event details copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy details to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-space-deep-blue border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-accent" />
            Security Event Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Detailed information about this security event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(event.status)}
                <h3 className="text-lg font-semibold text-white">{event.type}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(event.severity)}>
                  {event.severity}
                </Badge>
                <span className="text-sm text-gray-400">#{event.id}</span>
              </div>
            </div>
            <Button
              onClick={handleCopyDetails}
              variant="outline"
              size="sm"
              className="border-gray-600 hover:bg-gray-800"
            >
              {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Details'}
            </Button>
          </div>

          <Separator className="bg-gray-700" />

          {/* Event Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Description</h4>
            <p className="text-white bg-black/20 p-3 rounded-lg border border-gray-700">
              {event.description}
            </p>
          </div>

          {/* Timestamp */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Timestamp</h4>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-white">{event.timestamp}</span>
            </div>
          </div>

          {/* Technical Details */}
          {event.details && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-300">Technical Details</h4>
              <div className="bg-black/20 p-4 rounded-lg border border-gray-700 space-y-3">
                {event.details.ipAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">IP Address:</span>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded text-sm">
                      {event.details.ipAddress}
                    </code>
                  </div>
                )}
                
                {event.details.userId && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">User ID:</span>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded text-sm">
                      {event.details.userId}
                    </code>
                  </div>
                )}

                {event.details.endpoint && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Endpoint:</span>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded text-sm">
                      {event.details.endpoint}
                    </code>
                  </div>
                )}

                {event.details.attemptCount && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Attempt Count:</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      {event.details.attemptCount}
                    </Badge>
                  </div>
                )}

                {event.details.location && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Location:</span>
                    <span className="text-white">{event.details.location}</span>
                  </div>
                )}

                {event.details.userAgent && (
                  <div className="space-y-1">
                    <span className="text-sm text-gray-300">User Agent:</span>
                    <code className="block text-white bg-gray-800 p-2 rounded text-xs break-all">
                      {event.details.userAgent}
                    </code>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 hover:bg-gray-800"
            >
              Close
            </Button>
            <Button className="bg-accent hover:bg-accent/80 text-white">
              Mark as Resolved
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
