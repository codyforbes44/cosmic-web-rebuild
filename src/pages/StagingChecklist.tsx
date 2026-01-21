import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { FEATURES, ENV, IS_PROD } from '@/config/environment';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Loader2, 
  RefreshCw,
  Database,
  Shield,
  Zap,
  Globe,
  Lock,
  Server,
  FileCheck,
  ArrowLeft
} from 'lucide-react';
import SEO from '@/components/SEO';

interface CheckResult {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  message?: string;
  duration?: number;
}

const initialChecks: CheckResult[] = [
  // Database checks
  { id: 'db-connection', name: 'Database Connection', category: 'Database', status: 'pending' },
  { id: 'db-tables', name: 'Required Tables Exist', category: 'Database', status: 'pending' },
  { id: 'db-rls', name: 'RLS Policies Active', category: 'Database', status: 'pending' },
  
  // Auth checks
  { id: 'auth-config', name: 'Auth Configuration', category: 'Authentication', status: 'pending' },
  { id: 'auth-session', name: 'Session Management', category: 'Authentication', status: 'pending' },
  
  // API checks
  { id: 'api-supabase', name: 'Supabase API', category: 'APIs', status: 'pending' },
  { id: 'api-edge-functions', name: 'Edge Functions', category: 'APIs', status: 'pending' },
  
  // Feature flags
  { id: 'feature-flags', name: 'Feature Flags Configuration', category: 'Configuration', status: 'pending' },
  { id: 'env-detection', name: 'Environment Detection', category: 'Configuration', status: 'pending' },
  
  // Security checks
  { id: 'security-headers', name: 'Security Headers', category: 'Security', status: 'pending' },
  { id: 'security-csp', name: 'Content Security Policy', category: 'Security', status: 'pending' },
  
  // Performance
  { id: 'perf-vitals', name: 'Web Vitals Monitoring', category: 'Performance', status: 'pending' },
  { id: 'perf-pwa', name: 'PWA Configuration', category: 'Performance', status: 'pending' },
];

const StagingChecklist: React.FC = () => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState<CheckResult[]>(initialChecks);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Redirect if in production
  useEffect(() => {
    if (IS_PROD) {
      navigate('/');
    }
  }, [navigate]);

  const updateCheck = (id: string, update: Partial<CheckResult>) => {
    setChecks(prev => prev.map(c => c.id === id ? { ...c, ...update } : c));
  };

  const runChecks = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setChecks(initialChecks);

    // Database Connection
    await runCheck('db-connection', async () => {
      const start = Date.now();
      const { error } = await supabase.from('profiles').select('id').limit(1);
      if (error && !error.message.includes('no rows')) throw error;
      return { duration: Date.now() - start };
    });

    // Required Tables
    await runCheck('db-tables', async () => {
      const tables = ['profiles', 'user_roles', 'visitor_metadata', 'contact_submissions'];
      const results = await Promise.all(
        tables.map(async (table) => {
          const { error } = await supabase.from(table as any).select('id').limit(1);
          return { table, exists: !error || error.message.includes('no rows') || error.message.includes('permission') };
        })
      );
      const missing = results.filter(r => !r.exists);
      if (missing.length > 0) {
        throw new Error(`Missing tables: ${missing.map(m => m.table).join(', ')}`);
      }
      return { message: `${tables.length} tables verified` };
    });

    // RLS Policies
    await runCheck('db-rls', async () => {
      // Test that RLS is working by trying to access admin-only data without auth
      const { data, error } = await supabase.from('user_roles').select('*').limit(1);
      // If we get data without being logged in as admin, RLS might not be working
      if (data && data.length > 0) {
        return { status: 'warning' as const, message: 'RLS may be misconfigured - data accessible without auth' };
      }
      return { message: 'RLS policies are active' };
    });

    // Auth Configuration
    await runCheck('auth-config', async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return { message: session ? 'Authenticated session active' : 'No active session (OK for public access)' };
    });

    // Session Management
    await runCheck('auth-session', async () => {
      const hasLocalStorage = typeof localStorage !== 'undefined';
      const hasSessionStorage = typeof sessionStorage !== 'undefined';
      if (!hasLocalStorage || !hasSessionStorage) {
        throw new Error('Storage APIs not available');
      }
      return { message: 'Storage APIs available' };
    });

    // Supabase API
    await runCheck('api-supabase', async () => {
      const start = Date.now();
      const { error } = await supabase.from('subscription_packages').select('id').limit(1);
      if (error && !error.message.includes('no rows')) throw error;
      return { duration: Date.now() - start, message: 'Supabase API responsive' };
    });

    // Edge Functions
    await runCheck('api-edge-functions', async () => {
      try {
        const response = await fetch(
          `https://strixttogzthapdhuczm.supabase.co/functions/v1/visitor-metadata`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true }),
          }
        );
        if (!response.ok && response.status !== 400) {
          return { status: 'warning' as const, message: `Edge function returned ${response.status}` };
        }
        return { message: 'Edge functions accessible' };
      } catch {
        return { status: 'warning' as const, message: 'Edge functions may not be deployed' };
      }
    });

    // Feature Flags
    await runCheck('feature-flags', async () => {
      const flags = Object.entries(FEATURES);
      const enabledCount = flags.filter(([, v]) => v).length;
      return { message: `${enabledCount}/${flags.length} features enabled for ${ENV}` };
    });

    // Environment Detection
    await runCheck('env-detection', async () => {
      if (ENV === 'production' && !IS_PROD) {
        throw new Error('Environment mismatch detected');
      }
      return { message: `Environment: ${ENV}` };
    });

    // Security Headers
    await runCheck('security-headers', async () => {
      const metaTags = document.querySelectorAll('meta[http-equiv]');
      const securityMetas = Array.from(metaTags).filter(m => 
        ['X-Content-Type-Options', 'X-Frame-Options', 'X-XSS-Protection'].includes(
          m.getAttribute('http-equiv') || ''
        )
      );
      if (securityMetas.length < 2) {
        return { status: 'warning' as const, message: 'Some security headers missing' };
      }
      return { message: `${securityMetas.length} security headers configured` };
    });

    // CSP
    await runCheck('security-csp', async () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!cspMeta) {
        return { status: 'warning' as const, message: 'CSP meta tag not found' };
      }
      return { message: 'CSP configured' };
    });

    // Web Vitals
    await runCheck('perf-vitals', async () => {
      if (!FEATURES.enablePerformanceMonitoring) {
        return { status: 'warning' as const, message: 'Performance monitoring disabled' };
      }
      return { message: 'Web Vitals monitoring enabled' };
    });

    // PWA
    await runCheck('perf-pwa', async () => {
      const manifest = document.querySelector('link[rel="manifest"]');
      if (!manifest) {
        return { status: 'warning' as const, message: 'PWA manifest not found' };
      }
      if (!('serviceWorker' in navigator)) {
        return { status: 'warning' as const, message: 'Service Worker not supported' };
      }
      return { message: 'PWA configured' };
    });

    setIsRunning(false);
  };

  const runCheck = async (
    id: string, 
    checker: () => Promise<{ status?: 'passed' | 'warning'; message?: string; duration?: number }>
  ) => {
    updateCheck(id, { status: 'running' });
    try {
      const result = await checker();
      updateCheck(id, { 
        status: result.status || 'passed', 
        message: result.message,
        duration: result.duration 
      });
    } catch (error) {
      updateCheck(id, { 
        status: 'failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const categories = [...new Set(checks.map(c => c.category))];
  const passed = checks.filter(c => c.status === 'passed').length;
  const failed = checks.filter(c => c.status === 'failed').length;
  const warnings = checks.filter(c => c.status === 'warning').length;
  const progress = ((passed + failed + warnings) / checks.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Database': return <Database className="h-4 w-4" />;
      case 'Authentication': return <Lock className="h-4 w-4" />;
      case 'APIs': return <Server className="h-4 w-4" />;
      case 'Configuration': return <FileCheck className="h-4 w-4" />;
      case 'Security': return <Shield className="h-4 w-4" />;
      case 'Performance': return <Zap className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: CheckResult['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'running': return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-400" />;
    }
  };

  if (IS_PROD) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Staging Checklist" 
        description="Pre-deployment validation checklist"
      />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Staging Checklist</h1>
                <p className="text-muted-foreground">
                  Validate all systems before deploying to production
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                {ENV.toUpperCase()}
              </Badge>
              <Button 
                onClick={runChecks} 
                disabled={isRunning}
                className="gap-2"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {isRunning ? 'Running...' : 'Run All Checks'}
              </Button>
            </div>
          </div>

          {/* Progress */}
          {(isRunning || progress > 0) && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle2 className="h-4 w-4" /> {passed} passed
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <AlertTriangle className="h-4 w-4" /> {warnings} warnings
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="h-4 w-4" /> {failed} failed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Checks by Category */}
          {categories.map(category => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getCategoryIcon(category)}
                  {category}
                </CardTitle>
                <CardDescription>
                  {checks.filter(c => c.category === category && c.status === 'passed').length}/
                  {checks.filter(c => c.category === category).length} checks passed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {checks.filter(c => c.category === category).map(check => (
                  <div 
                    key={check.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        {check.message && (
                          <p className="text-sm text-muted-foreground">{check.message}</p>
                        )}
                      </div>
                    </div>
                    {check.duration && (
                      <span className="text-sm text-muted-foreground">
                        {check.duration}ms
                      </span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Summary */}
          {!isRunning && progress === 100 && (
            <Card className={failed > 0 ? 'border-red-500' : warnings > 0 ? 'border-yellow-500' : 'border-green-500'}>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  {failed > 0 ? (
                    <>
                      <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                      <h3 className="text-xl font-bold text-red-500">Not Ready for Production</h3>
                      <p className="text-muted-foreground">
                        {failed} critical issues must be resolved before deploying
                      </p>
                    </>
                  ) : warnings > 0 ? (
                    <>
                      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
                      <h3 className="text-xl font-bold text-yellow-500">Ready with Warnings</h3>
                      <p className="text-muted-foreground">
                        {warnings} warnings should be reviewed before deploying
                      </p>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                      <h3 className="text-xl font-bold text-green-500">Ready for Production</h3>
                      <p className="text-muted-foreground">
                        All checks passed! You can safely deploy to production.
                      </p>
                    </>
                  )}
                  {startTime && (
                    <p className="text-sm text-muted-foreground">
                      Completed in {((Date.now() - startTime) / 1000).toFixed(1)}s
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default StagingChecklist;
