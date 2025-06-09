
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Shield, 
  Activity,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecretInfo {
  name: string;
  configured: boolean;
  lastUpdated?: string;
  description: string;
}

export const AdminAPIPanel: React.FC = () => {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [newSecretName, setNewSecretName] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');
  const { toast } = useToast();

  // Mock data for secrets - in a real implementation, this would come from Supabase
  const secrets: SecretInfo[] = [
    {
      name: 'OPENAI_API_KEY',
      configured: true,
      lastUpdated: '2024-01-15',
      description: 'OpenAI API key for chat functionality'
    },
    {
      name: 'HUGGING_FACE_TOKEN',
      configured: true,
      lastUpdated: '2024-01-10',
      description: 'Hugging Face token for AI models'
    },
    {
      name: 'STRIPE_SECRET_KEY',
      configured: false,
      description: 'Stripe secret key for payment processing'
    },
    {
      name: 'SENDGRID_API_KEY',
      configured: false,
      description: 'SendGrid API key for email services'
    }
  ];

  const { data: apiUsage, isLoading: isLoadingUsage } = useQuery({
    queryKey: ['api-usage'],
    queryFn: async () => {
      // Mock API usage data - in real implementation, fetch from edge functions logs
      return {
        openai: { requests: 245, lastUsed: '2024-01-15T10:30:00Z' },
        huggingface: { requests: 89, lastUsed: '2024-01-15T09:15:00Z' },
        total: 334
      };
    },
  });

  const toggleSecretVisibility = (secretName: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [secretName]: !prev[secretName]
    }));
  };

  const handleAddSecret = () => {
    if (!newSecretName || !newSecretValue) {
      toast({
        title: "Error",
        description: "Please enter both secret name and value",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would call a Supabase edge function
    toast({
      title: "Secret added",
      description: `${newSecretName} has been configured`,
    });

    setNewSecretName('');
    setNewSecretValue('');
  };

  const handleDeleteSecret = (secretName: string) => {
    if (window.confirm(`Are you sure you want to delete ${secretName}?`)) {
      toast({
        title: "Secret deleted",
        description: `${secretName} has been removed`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* API Usage Overview */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            API Usage Overview
          </CardTitle>
          <CardDescription className="text-gray-400">
            Monitor API usage and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Requests</p>
                  <p className="text-2xl font-bold text-white">
                    {isLoadingUsage ? '...' : apiUsage?.total || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </div>
                <Activity className="h-8 w-8 text-accent" />
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">OpenAI Requests</p>
                  <p className="text-2xl font-bold text-white">
                    {isLoadingUsage ? '...' : apiUsage?.openai?.requests || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </div>
                <Key className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">HuggingFace Requests</p>
                  <p className="text-2xl font-bold text-white">
                    {isLoadingUsage ? '...' : apiUsage?.huggingface?.requests || 0}
                  </p>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </div>
                <Key className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secrets Management */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Secret Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage API keys and secrets for external services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Secret */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg">
            <div>
              <Label htmlFor="secretName" className="text-white">Secret Name</Label>
              <Input
                id="secretName"
                value={newSecretName}
                onChange={(e) => setNewSecretName(e.target.value)}
                placeholder="e.g., STRIPE_SECRET_KEY"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="secretValue" className="text-white">Secret Value</Label>
              <Input
                id="secretValue"
                type="password"
                value={newSecretValue}
                onChange={(e) => setNewSecretValue(e.target.value)}
                placeholder="Enter secret value"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAddSecret}
                className="bg-accent hover:bg-accent-hover text-accent-foreground w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Secret
              </Button>
            </div>
          </div>

          {/* Secrets Table */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Secret Name</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Description</TableHead>
                  <TableHead className="text-gray-300">Last Updated</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secrets.map((secret) => (
                  <TableRow key={secret.name} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-white font-medium">
                      {secret.name}
                    </TableCell>
                    <TableCell>
                      {secret.configured ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Configured
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Missing
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {secret.description}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {secret.lastUpdated || 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSecretVisibility(secret.name)}
                          className="h-8 w-8 p-0 hover:bg-gray-700"
                        >
                          {showSecrets[secret.name] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        {secret.configured && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSecret(secret.name)}
                            className="h-8 w-8 p-0 hover:bg-red-600/20 text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* API Health Status */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            API Health Status
          </CardTitle>
          <CardDescription className="text-gray-400">
            Monitor the status of external API services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <p className="text-white font-medium">OpenAI API</p>
                  <p className="text-gray-400 text-sm">Last check: 2 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <p className="text-white font-medium">HuggingFace API</p>
                  <p className="text-gray-400 text-sm">Last check: 5 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                Operational
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
