import React from 'react';
import { Mail, Send, Webhook, Shield, Zap, Settings, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractiveButton } from './interactive-button';
import { EnhancedCard, FeatureCard } from './enhanced-card';
import { Badge } from './badge';
import { Input } from './input';
import { Textarea } from './textarea';
import { useToast } from '@/hooks/use-toast';

interface IntegrationPanelProps {
  className?: string;
}

export const IntegrationPanel: React.FC<IntegrationPanelProps> = ({ className }) => {
  const { toast } = useToast();
  const [emailData, setEmailData] = React.useState({
    to: '',
    subject: '',
    template: 'contact' as 'contact' | 'newsletter' | 'notification' | 'welcome'
  });
  const [webhookData, setWebhookData] = React.useState({
    url: '',
    service: 'zapier' as 'zapier' | 'make' | 'ifttt' | 'custom'
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Test email service
  const testEmailService = async () => {
    if (!emailData.to || !emailData.subject) {
      toast({
        title: "Missing Information",
        description: "Please provide email and subject",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/functions/v1/email-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject,
          template: emailData.template,
          variables: {
            name: 'Test User',
            message: 'This is a test email from the integration panel.'
          }
        })
      });

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: "Test email sent successfully!"
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Failed to send test email. Check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test webhook integration
  const testWebhook = async () => {
    if (!webhookData.url) {
      toast({
        title: "Missing URL",
        description: "Please provide a webhook URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/functions/v1/webhook-integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookData.url,
          service: webhookData.service,
          data: {
            event: 'integration_test',
            message: 'This is a test webhook from the integration panel',
            user: 'Integration Panel',
            timestamp: new Date().toISOString()
          }
        })
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Webhook Sent",
          description: "Test webhook sent successfully!"
        });
      } else {
        throw new Error(result.error || 'Failed to send webhook');
      }
    } catch (error) {
      toast({
        title: "Webhook Failed",
        description: "Failed to send test webhook. Check your URL.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test security scanner
  const testSecurityScan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/functions/v1/security-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'headers',
          url: window.location.origin
        })
      });

      const result = await response.json();
      toast({
        title: "Security Scan Complete",
        description: `Security grade: ${result.grade} (${result.score}/100)`
      });
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Failed to perform security scan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Third-Party Integrations</h2>
        <p className="text-muted-foreground">
          Connect and configure external services and APIs
        </p>
      </div>

      {/* Integration Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Email Service */}
        <EnhancedCard variant="interactive" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Email Service</h3>
              <Badge variant="success" size="sm">Configured</Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="Recipient email"
              value={emailData.to}
              onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
            />
            <Input
              placeholder="Email subject"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
            />
            <select
              className="w-full px-3 py-2 border rounded-md bg-background"
              value={emailData.template}
              onChange={(e) => setEmailData(prev => ({ ...prev, template: e.target.value as any }))}
            >
              <option value="contact">Contact Form</option>
              <option value="newsletter">Newsletter</option>
              <option value="notification">Notification</option>
              <option value="welcome">Welcome Email</option>
            </select>
          </div>

          <InteractiveButton
            onClick={testEmailService}
            loading={isLoading}
            className="w-full gap-2"
          >
            <Send className="h-4 w-4" />
            Test Email
          </InteractiveButton>
        </EnhancedCard>

        {/* Webhook Integration */}
        <EnhancedCard variant="interactive" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Webhook className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Webhooks</h3>
              <Badge variant="secondary" size="sm">Ready</Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="Webhook URL"
              value={webhookData.url}
              onChange={(e) => setWebhookData(prev => ({ ...prev, url: e.target.value }))}
            />
            <select
              className="w-full px-3 py-2 border rounded-md bg-background"
              value={webhookData.service}
              onChange={(e) => setWebhookData(prev => ({ ...prev, service: e.target.value as any }))}
            >
              <option value="zapier">Zapier</option>
              <option value="make">Make.com</option>
              <option value="ifttt">IFTTT</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <InteractiveButton
            onClick={testWebhook}
            loading={isLoading}
            className="w-full gap-2"
          >
            <Zap className="h-4 w-4" />
            Test Webhook
          </InteractiveButton>
        </EnhancedCard>

        {/* Security Scanner */}
        <EnhancedCard variant="interactive" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Security Scanner</h3>
              <Badge variant="info" size="sm">Active</Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Scan your application for security vulnerabilities and configuration issues.
          </p>

          <InteractiveButton
            onClick={testSecurityScan}
            loading={isLoading}
            className="w-full gap-2"
          >
            <Shield className="h-4 w-4" />
            Run Security Scan
          </InteractiveButton>
        </EnhancedCard>
      </div>

      {/* Popular Integrations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Popular Integrations</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Google Analytics', icon: '📊', status: 'Available' },
            { name: 'Slack', icon: '💬', status: 'Available' },
            { name: 'HubSpot', icon: '🎯', status: 'Available' },
            { name: 'Salesforce', icon: '☁️', status: 'Available' }
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-lg">{integration.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.status}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Links */}
      <div className="flex flex-wrap gap-3">
        <InteractiveButton variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          API Configuration
        </InteractiveButton>
        <InteractiveButton variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Security Settings
        </InteractiveButton>
        <InteractiveButton variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Documentation
        </InteractiveButton>
      </div>
    </div>
  );
};