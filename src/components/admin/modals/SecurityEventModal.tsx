import React from 'react';
import BaseModal from '@/components/common/BaseModal';
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
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'investigating': return <Eye className="h-4 w-4 text-blue-400" />;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
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

  const handleAction = () => {
    toast({
      title: "Action logged",
      description: "Security event has been flagged for review.",
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="lg"
      headerContent={
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Security Event Details</h2>
            <p className="text-sm text-muted-foreground">Detailed information about the security event</p>
          </div>
        </div>
      }
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleAction}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Take Action
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Event Header */}
        <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon(event.status)}
              <h3 className="text-lg font-semibold">{event.type}</h3>
              <Badge className={getSeverityColor(event.severity)}>
                {event.severity}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3">{event.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Details
          </Button>
        </div>

        {/* Event Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Severity Level</div>
            <div className="font-medium capitalize">{event.severity}</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Current Status</div>
            <div className="font-medium capitalize flex items-center gap-2">
              {getStatusIcon(event.status)}
              {event.status}
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Event Type</div>
            <div className="font-medium">{event.type}</div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-medium mb-3">Additional Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Event ID:</span>
              <span className="font-mono">{event.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timestamp:</span>
              <span>{event.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Priority:</span>
              <span className="capitalize">{event.severity}</span>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
