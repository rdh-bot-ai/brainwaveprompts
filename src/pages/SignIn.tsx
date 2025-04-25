import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/a4fa3116-9da7-4898-a3e2-7acc1ff57e59.png" 
              alt="Brainwave Prompts" 
              className="h-16 w-auto"
            />
          </div>
          <Card className="bg-[#2C3142] border-gray-800">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your email below to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
