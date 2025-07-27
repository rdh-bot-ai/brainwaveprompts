import React, { useContext } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Tag, 
  FileText, 
  Upload, 
  Settings, 
  BookOpen,
  ChevronRight 
} from "lucide-react";

const PromptManagementLayout = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Check if user is admin (in a real app, this would be a proper role check)
  const isAdmin = user.email === "admin@brainwaveprompts.com" || user.id === "admin";

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  const navigationItems = [
    {
      href: "/super-admin/prompt-management/overview",
      label: "Overview",
      icon: BarChart3,
    },
    {
      href: "/super-admin/prompt-management/categories",
      label: "Categories",
      icon: Tag,
    },
    {
      href: "/super-admin/prompt-management/prompts",
      label: "Prompts",
      icon: FileText,
    },
    {
      href: "/super-admin/prompt-management/bulk-import",
      label: "Bulk Import",
      icon: Upload,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Link 
              to="/admin" 
              className="hover:text-foreground transition-colors"
            >
              Super Admin
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Prompt Management</span>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Button
                          key={item.href}
                          asChild
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-2 h-9",
                            isActive && "bg-muted font-medium"
                          )}
                        >
                          <Link to={item.href}>
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptManagementLayout;