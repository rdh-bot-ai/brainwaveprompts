import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Upload, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { usePlan } from '@/contexts/PlanContext';
import { PlanBadge } from './PlanBadge';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout, toggleAdminMode, isAdmin } = useAdminAuth();
  const { currentPlan, setPlan } = usePlan();
  const location = useLocation();

  const sidebarItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Prompts',
      path: '/admin/prompts',
      icon: FileText,
    },
    {
      label: 'Bulk Import',
      path: '/admin/prompts/bulk-import',
      icon: Upload,
    },
    {
      label: 'Categories',
      path: '/admin/categories',
      icon: FolderOpen,
    },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Brainwave Admin</h1>
            <Badge variant="outline">Frontend Only</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Plan Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Test Plan:</span>
              <select
                value={currentPlan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="ANON">Anonymous</option>
                <option value="FREE">Free</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                  <PlanBadge plan={user.plan} />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAdminMode}
                >
                  {isAdmin ? 'Exit Admin' : 'Enter Admin'}
                </Button>
                
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                  ${isActivePath(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};