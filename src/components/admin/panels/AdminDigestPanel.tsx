import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Mail, Clock, Calendar, Send, History, Loader2, CheckCircle, XCircle, Plus, X } from 'lucide-react';

interface DigestConfig {
  id: string;
  recipient_emails: string[];
  is_enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  day_of_week: number;
  preferred_time: string;
  last_sent_at: string | null;
}

interface DigestHistory {
  id: string;
  sent_at: string;
  recipient_emails: string[];
  period_start: string;
  period_end: string;
  status: 'sent' | 'failed' | 'pending';
  error_message: string | null;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const AdminDigestPanel: React.FC = () => {
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Fetch config
  const { data: config, isLoading: configLoading } = useQuery({
    queryKey: ['digest-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_digest_config')
        .select('*')
        .single();
      if (error) throw error;
      return data as DigestConfig;
    },
  });

  // Fetch history
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['digest-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_digest_history')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as DigestHistory[];
    },
  });

  // Update config mutation
  const updateConfig = useMutation({
    mutationFn: async (updates: Partial<DigestConfig>) => {
      const { error } = await supabase
        .from('analytics_digest_config')
        .update(updates)
        .eq('id', config?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digest-config'] });
      toast.success('Configuration updated');
    },
    onError: (error) => {
      toast.error('Failed to update configuration: ' + error.message);
    },
  });

  const handleAddEmail = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    const emails = [...(config?.recipient_emails || []), newEmail];
    updateConfig.mutate({ recipient_emails: emails });
    setNewEmail('');
  };

  const handleRemoveEmail = (email: string) => {
    const emails = (config?.recipient_emails || []).filter(e => e !== email);
    updateConfig.mutate({ recipient_emails: emails });
  };

  const handleSendTestDigest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      toast.error('Please enter a valid test email address');
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('analytics-digest', {
        body: { forceRun: true, testEmail },
      });

      if (error) throw error;
      toast.success('Test digest sent to ' + testEmail);
      queryClient.invalidateQueries({ queryKey: ['digest-history'] });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to send test digest: ' + errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendNow = async () => {
    if ((config?.recipient_emails || []).length === 0) {
      toast.error('Please add at least one recipient email');
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('analytics-digest', {
        body: { forceRun: true },
      });

      if (error) throw error;
      toast.success('Digest sent to all recipients');
      queryClient.invalidateQueries({ queryKey: ['digest-history'] });
      queryClient.invalidateQueries({ queryKey: ['digest-config'] });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to send digest: ' + errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Analytics Digest Configuration
          </CardTitle>
          <CardDescription>
            Configure weekly email digests summarizing visitor trends, Web Vitals, and key metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="digest-enabled" className="text-base">Enable Digest</Label>
              <p className="text-sm text-muted-foreground">
                Automatically send analytics digest emails
              </p>
            </div>
            <Switch
              id="digest-enabled"
              checked={config?.is_enabled || false}
              onCheckedChange={(checked) => updateConfig.mutate({ is_enabled: checked })}
            />
          </div>

          {/* Frequency */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={config?.frequency || 'weekly'}
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                  updateConfig.mutate({ frequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config?.frequency === 'weekly' && (
              <div className="space-y-2">
                <Label>Day of Week</Label>
                <Select
                  value={String(config?.day_of_week || 1)}
                  onValueChange={(value) => updateConfig.mutate({ day_of_week: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day, index) => (
                      <SelectItem key={index} value={String(index)}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Recipients */}
          <div className="space-y-3">
            <Label>Recipients</Label>
            <div className="flex flex-wrap gap-2">
              {(config?.recipient_emails || []).map((email) => (
                <Badge key={email} variant="secondary" className="px-3 py-1">
                  {email}
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Add recipient email..."
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                className="flex-1"
              />
              <Button onClick={handleAddEmail} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Last Sent */}
          {config?.last_sent_at && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last sent: {new Date(config.last_sent_at).toLocaleString()}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <div className="flex gap-2 flex-1 min-w-[200px]">
              <Input
                type="email"
                placeholder="Test email address..."
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSendTestDigest}
                disabled={isSending || !testEmail}
                variant="outline"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Test
              </Button>
            </div>
            <Button
              onClick={handleSendNow}
              disabled={isSending || (config?.recipient_emails || []).length === 0}
            >
              {isSending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              Send Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Digest History
          </CardTitle>
          <CardDescription>
            Recent analytics digest emails sent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (history || []).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No digest emails sent yet</p>
              <p className="text-sm">Send a test digest to see it here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sent</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(history || []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {new Date(item.sent_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.sent_at).toLocaleTimeString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(item.period_start).toLocaleDateString()} - {new Date(item.period_end).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.recipient_emails.length} recipient{item.recipient_emails.length !== 1 ? 's' : ''}
                    </TableCell>
                    <TableCell>
                      {item.status === 'sent' ? (
                        <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Sent
                        </Badge>
                      ) : item.status === 'failed' ? (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
