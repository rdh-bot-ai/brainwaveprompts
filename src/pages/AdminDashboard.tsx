import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Users, BarChart3, DollarSign, Settings } from "lucide-react";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const { user, isLoading } = useContext(AuthContext);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Super Admin Dashboard
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage users, subscriptions, and monitor platform analytics
              </p>
            </div>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-6 grid w-full lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="billing">
                <DollarSign className="mr-2 h-4 w-4" />
                Billing & Usage
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <AdminUserManagement />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AdminAnalytics />
            </TabsContent>
            
            <TabsContent value="billing">
              <AdminAnalytics showBilling={true} />
            </TabsContent>
            
            <TabsContent value="settings">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;