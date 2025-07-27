import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FolderOpen, Upload, BarChart3, RefreshCw } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { getStoredPrompts, getStoredCategories, resetDemoData } from '@/data/admin-stubs';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAdminAuth();
  const { toast } = useToast();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const prompts = getStoredPrompts();
  const categories = getStoredCategories();

  const handleResetData = () => {
    resetDemoData();
    toast({
      title: 'Demo data reset',
      description: 'All data has been reset to demo defaults',
    });
    window.location.reload();
  };

  const stats = [
    {
      title: 'Total Prompts',
      value: prompts.length,
      description: `${prompts.filter(p => p.status === 'PUBLISHED').length} published`,
      icon: FileText,
    },
    {
      title: 'Categories',
      value: categories.length,
      description: `${categories.filter(c => c.is_featured).length} featured`,
      icon: FolderOpen,
    },
    {
      title: 'Draft Prompts',
      value: prompts.filter(p => p.status === 'DRAFT').length,
      description: 'Pending review',
      icon: Upload,
    },
    {
      title: 'Premium Content',
      value: prompts.filter(p => p.visibility === 'PREMIUM').length,
      description: 'Premium tier prompts',
      icon: BarChart3,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Admin overview and quick actions
            </p>
          </div>
          
          <Button variant="outline" onClick={handleResetData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Demo Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" asChild>
                <a href="/admin/prompts/bulk-import">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import Prompts
                </a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="/admin/prompts">
                  <FileText className="h-4 w-4 mr-2" />
                  Manage Prompts
                </a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="/admin/categories">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Manage Categories
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span>Frontend Only (No Backend)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage:</span>
                <span>Local Storage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Authentication:</span>
                <span>Mock Session</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};