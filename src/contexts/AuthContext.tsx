
import React, { createContext, useState, useEffect } from "react";
import { Plan, getPlanConfig } from '@/config/planMatrix';
import { getCreditUsage, canConsumeCredits, consumeCredits, resetCreditsIfNewMonth } from '@/utils/credits';

type User = {
  id: string;
  email: string;
  name?: string;
  plan: Plan;
};

export interface CreditUsage {
  used: number;
  limit: number;
  remaining: number;
  month: string;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  creditUsage: CreditUsage | null;
  canUsePrompt: () => boolean;
  usePrompt: () => boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  upgradePlan: (newPlan: Plan) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  creditUsage: null,
  canUsePrompt: () => false,
  usePrompt: () => false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  upgradePlan: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [creditUsage, setCreditUsage] = useState<CreditUsage | null>(null);

  // Update credit usage whenever user changes
  useEffect(() => {
    if (user) {
      resetCreditsIfNewMonth(user.id);
      const usage = getCreditUsage(user.id, user.plan);
      setCreditUsage(usage);
    } else {
      setCreditUsage(null);
    }
  }, [user]);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Migrate old subscription field to plan
      if (parsedUser.subscription && !parsedUser.plan) {
        parsedUser.plan = parsedUser.subscription === "free" ? "FREE_TIER" : 
                          parsedUser.subscription === "registered" ? "REGISTERED" : "PREMIUM";
        delete parsedUser.subscription;
        delete parsedUser.promptsRemaining;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const canUsePrompt = (): boolean => {
    if (!user) return false;
    return canConsumeCredits(user.id, user.plan, 1);
  };

  const usePrompt = (): boolean => {
    if (!user) return false;
    const success = consumeCredits(user.id, user.plan, 1);
    if (success) {
      // Update credit usage
      const usage = getCreditUsage(user.id, user.plan);
      setCreditUsage(usage);
    }
    return success;
  };

  const upgradePlan = (newPlan: Plan) => {
    if (user) {
      const updatedUser = { ...user, plan: newPlan };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would call an auth API
    setIsLoading(true);
    try {
      // Mock successful login
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        plan: "FREE_TIER",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Sign in error:", error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Mock registration - in a real app, this would call an auth API
    setIsLoading(true);
    try {
      // Mock successful registration
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        plan: "REGISTERED", // New users get the registered tier
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Sign up error:", error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setCreditUsage(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      creditUsage,
      canUsePrompt,
      usePrompt,
      signIn, 
      signUp, 
      signOut,
      upgradePlan 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
