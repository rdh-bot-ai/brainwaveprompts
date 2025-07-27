import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePromptManagementStore } from '@/stores/promptManagementStore';
import { PlanBadge } from '@/components/prompt-management/PlanBadge';
import { StatusBadge } from '@/components/prompt-management/StatusBadge';
import { Plus, Upload, FileText, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PlanTier } from '@/types/prompt-management';

export default function PromptManagementOverview() {
  const { 
    categories, 
    prompts, 
    planPreview, 
    setPlanPreview 
  } = usePromptManagementStore();

  const statusCounts = {
    PUBLISHED: prompts.filter(p => p.status === 'PUBLISHED').length,
    DRAFT: prompts.filter(p => p.status === 'DRAFT').length,
    ARCHIVED: prompts.filter(p => p.status === 'ARCHIVED').length,
  };

  const visibilityCounts = {
    ANON: prompts.filter(p => p.visibility === 'ANON').length,
    FREE: prompts.filter(p => p.visibility === 'FREE').length,
    PREMIUM: prompts.filter(p => p.visibility === 'PREMIUM').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prompt Management Overview</h1>
          <p className="text-muted-foreground">
            Manage categories, prompts, and preview plan-based access
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Plan Preview:</span>
            <Select value={planPreview} onValueChange={(value: PlanTier) => setPlanPreview(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ANON">ANON</SelectItem>
                <SelectItem value="FREE">FREE</SelectItem>
                <SelectItem value="PREMIUM">PREMIUM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {categories.filter(c => c.isFeatured).length} featured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prompts.length}</div>
            <p className="text-xs text-muted-foreground">
              {prompts.filter(p => p.isFeatured).length} featured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <StatusBadge status="PUBLISHED" />
              <span className="text-sm font-mono">{statusCounts.PUBLISHED}</span>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status="DRAFT" />
              <span className="text-sm font-mono">{statusCounts.DRAFT}</span>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status="ARCHIVED" />
              <span className="text-sm font-mono">{statusCounts.ARCHIVED}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visibility Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <PlanBadge plan="ANON" />
              <span className="text-sm font-mono">{visibilityCounts.ANON}</span>
            </div>
            <div className="flex items-center justify-between">
              <PlanBadge plan="FREE" />
              <span className="text-sm font-mono">{visibilityCounts.FREE}</span>
            </div>
            <div className="flex items-center justify-between">
              <PlanBadge plan="PREMIUM" />
              <span className="text-sm font-mono">{visibilityCounts.PREMIUM}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild>
              <Link to="/super-admin/prompt-management/categories">
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Link>
            </Button>
            
            <Button asChild>
              <Link to="/super-admin/prompt-management/prompts">
                <Plus className="mr-2 h-4 w-4" />
                Create Prompt
              </Link>
            </Button>
            
            <Button asChild>
              <Link to="/super-admin/prompt-management/bulk-import">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Import
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prompts
              .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
              .slice(0, 5)
              .map(prompt => (
                <div key={prompt.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{prompt.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Category: {prompt.categorySlug} • Version: {prompt.version}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={prompt.status} />
                    <PlanBadge plan={prompt.visibility} />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}