
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PlanProvider } from "@/contexts/PlanContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import Profile from "./pages/Profile";
import PromptConsulting from "./pages/PromptConsulting";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard as NewAdminDashboard } from "./pages/admin/AdminDashboard";
import { PromptsList } from "./pages/admin/PromptsList";
import { BulkImport } from "./pages/admin/BulkImport";
import { CategoriesList } from "./pages/admin/CategoriesList";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <PlanProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/builder" element={<Builder />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/consulting" element={<PromptConsulting />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<NewAdminDashboard />} />
                  <Route path="/admin/prompts" element={<PromptsList />} />
                  <Route path="/admin/prompts/bulk-import" element={<BulkImport />} />
                  <Route path="/admin/categories" element={<CategoriesList />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </PlanProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
