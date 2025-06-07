
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Copy,
  Calendar,
  User,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

interface SecurityEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: SecurityEvent | null;
}

export const SecurityEventModal: React.FC<SecurityEventModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  const { toast } = useToast();

  if (!event) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const copyToClipboard = () => {
    const eventDetails = `
Security Event Details:
- Event ID: ${event.id}
- Type: ${event.type}
- Severity: ${event.severity}
- Status: ${event.status}
- Timestamp: ${event.timestamp}
- Description: ${event.description}
    `.trim();

    navigator.clipboard.writeText(eventDetails);
    toast({
      title: "Copied to clipboard",
      description: "Security event details have been copied.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-space-deep-blue border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-accent" />
            Security Event Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Detailed information about the security event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Header */}
          <div className="flex items-start justify-between p-4 bg-black/20 rounded-lg border border-gray-700">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(event.status)}
                <h3 className="text-lg font-semibold text-white">{event.type}</h3>
                <Badge className={getSeverityColor(event.severity)}>
                  {event.severity}
                </Badge>
              </div>
              <p className="text-gray-300 mb-3">{event.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.timestamp}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Event ID: {event.id}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="border-gray-600 hover:bg-gray-800"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Details
            </Button>
          </div>

          {/* Event Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-black/20 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Severity Level</div>
              <div className="text-white font-medium capitalize">{event.severity}</div>
            </div>
            <div className="p-3 bg-black/20 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Current Status</div>
              <div className="text-white font-medium capitalize flex items-center gap-2">
                {getStatusIcon(event.status)}
                {event.status}
              </div>
            </div>
            <div className="p-3 bg-black/20 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Event Type</div>
              <div className="text-white font-medium">{event.type}</div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="p-4 bg-black/20 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-3">Additional Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Event ID:</span>
                <span className="text-white font-mono">{event.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timestamp:</span>
                <span className="text-white">{event.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Priority:</span>
                <span className="text-white capitalize">{event.severity}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 hover:bg-gray-800"
            >
              Close
            </Button>
            <Button
              className="bg-accent hover:bg-accent/80"
              onClick={() => {
                // Here you could add logic to mark as resolved, investigate, etc.
                toast({
                  title: "Action logged",
                  description: "Security event has been flagged for review.",
                });
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Take Action
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
