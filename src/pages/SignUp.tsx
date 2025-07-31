import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { signUpSchema, getPasswordStrength, getPasswordStrengthLabel, getPasswordStrengthColor } from "@/utils/validation-schemas";
import { sanitizeEmail } from "@/utils/sanitization";
import { Progress } from "@/components/ui/progress";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form data with schema
    try {
      const validatedData = signUpSchema.parse({
        name: name.trim(),
        email: sanitizeEmail(email),
        password,
        confirmPassword
      });

      setIsLoading(true);

      try {
        await signUp(validatedData.email, validatedData.password, validatedData.name);
        navigate("/dashboard");
      } catch (err) {
        setError("Error creating account. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } catch (validationError: any) {
      if (validationError.errors && validationError.errors.length > 0) {
        setError(validationError.errors[0].message);
      } else {
        setError("Please check your input and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Brainwave Prompts
            </span>
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your information below to create your account
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter a strong password"
                    />
                    {password && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Password strength:</span>
                          <span 
                            className="text-xs font-medium"
                            style={{ color: getPasswordStrengthColor(passwordStrength.score) }}
                          >
                            {getPasswordStrengthLabel(passwordStrength.score)}
                          </span>
                        </div>
                        <Progress 
                          value={(passwordStrength.score / 5) * 100} 
                          className="h-2"
                          style={{ 
                            backgroundColor: '#e5e7eb',
                            '--progress-color': getPasswordStrengthColor(passwordStrength.score) 
                          } as React.CSSProperties}
                        />
                        {passwordStrength.feedback.length > 0 && (
                          <ul className="text-xs text-gray-500 space-y-1">
                            {passwordStrength.feedback.map((tip, index) => (
                              <li key={index}>• {tip}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign in
                </a>
              </div>
              <div className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
