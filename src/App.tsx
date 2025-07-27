
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import PromptManagementOverview from "./pages/super-admin/PromptManagementOverview";
import PromptManagementCategories from "./pages/super-admin/PromptManagementCategories";
import PromptManagementPrompts from "./pages/super-admin/PromptManagementPrompts";
import PromptManagementBulkImport from "./pages/super-admin/PromptManagementBulkImport";
import PromptManagementLayout from "./components/prompt-management/PromptManagementLayout";
import { usePromptManagementStore } from "./stores/promptManagementStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Component to initialize store data
function StoreInitializer() {
  const { loadSeeds, categories } = usePromptManagementStore();

  useEffect(() => {
    // Load seed data if store is empty
    if (categories.length === 0) {
      loadSeeds();
    }
  }, [loadSeeds, categories.length]);

  return null;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <StoreInitializer />
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
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Super Admin Prompt Management Routes */}
              <Route path="/super-admin/prompt-management" element={<PromptManagementLayout />}>
                <Route path="overview" element={<PromptManagementOverview />} />
                <Route path="categories" element={<PromptManagementCategories />} />
                <Route path="prompts" element={<PromptManagementPrompts />} />
                <Route path="bulk-import" element={<PromptManagementBulkImport />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
