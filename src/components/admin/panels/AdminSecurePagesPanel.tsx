
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  Plus,
  Lock,
  Users,
  Globe
} from 'lucide-react';

export const AdminSecurePagesPanel: React.FC = () => {
  const securePages = [
    {
      id: 1,
      title: 'Admin Dashboard',
      path: '/admin',
      accessLevel: 'admin',
      status: 'active',
      lastModified: '2024-06-12',
      views: 245
    },
    {
      id: 2,
      title: 'User Analytics',
      path: '/analytics',
      accessLevel: 'authenticated',
      status: 'active',
      lastModified: '2024-06-10',
      views: 156
    },
    {
      id: 3,
      title: 'Profile Management',
      path: '/profile',
      accessLevel: 'authenticated',
      status: 'active',
      lastModified: '2024-06-08',
      views: 892
    },
    {
      id: 4,
      title: 'System Settings',
      path: '/admin/system',
      accessLevel: 'admin',
      status: 'draft',
      lastModified: '2024-06-05',
      views: 23
    }
  ];

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'admin':
        return <Shield className="w-4 h-4 text-red-400" />;
      case 'authenticated':
        return <Users className="w-4 h-4 text-blue-400" />;
      case 'public':
        return <Globe className="w-4 h-4 text-green-400" />;
      default:
        return <Lock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'authenticated':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'public':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Secure Pages Management</h2>
          <p className="text-gray-400 mt-1">Manage protected content and access controls</p>
        </div>
        <Button className="bg-accent hover:bg-accent/80 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Secure Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pages</p>
                <p className="text-2xl font-bold text-white">{securePages.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admin Only</p>
                <p className="text-2xl font-bold text-white">
                  {securePages.filter(p => p.accessLevel === 'admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Pages</p>
                <p className="text-2xl font-bold text-white">
                  {securePages.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">
                  {securePages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Secure Pages</CardTitle>
          <CardDescription className="text-gray-400">
            Manage access controls and permissions for protected content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securePages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{page.title}</h3>
                    <p className="text-gray-400 text-sm">{page.path}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getAccessLevelIcon(page.accessLevel)}
                    <Badge className={getAccessLevelColor(page.accessLevel)}>
                      {page.accessLevel}
                    </Badge>
                  </div>

                  <Badge className={getStatusColor(page.status)}>
                    {page.status}
                  </Badge>

                  <div className="text-right">
                    <p className="text-white text-sm">{page.views.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">views</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white text-sm">{page.lastModified}</p>
                    <p className="text-gray-400 text-xs">modified</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-red-700 hover:text-white hover:border-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Control Settings */}
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Access Control Settings</CardTitle>
          <CardDescription className="text-gray-400">
            Configure global security settings for protected pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Authentication Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">Require Email Verification</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">Two-Factor Authentication</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                    Optional
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">Session Timeout</span>
                  <span className="text-white text-sm">24 hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Security Policies</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">Rate Limiting</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">IP Whitelisting</span>
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">
                    Disabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <span className="text-gray-300">Audit Logging</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Enabled
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Reset to Defaults
            </Button>
            <Button className="bg-accent hover:bg-accent/80 text-white">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
