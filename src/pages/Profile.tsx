
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, CreditCard, FileText, Calendar, Info, Lock, FileInvoice } from "lucide-react";
import UpgradePrompt from "@/components/subscription/UpgradePrompt";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }

  const mockInvoices = [
    { id: "INV-001", date: "2025-04-10", amount: "$7.50", status: "Paid" },
    { id: "INV-002", date: "2025-03-10", amount: "$7.50", status: "Paid" },
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock password change - in a real app, this would call an API
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordDialogOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Show success notification (would use a toast in real implementation)
      alert("Password updated successfully");
    }, 1000);
  };

  const subscriptionStatus = user.subscription || "free";
  const nextBillingDate = subscriptionStatus !== "free" 
    ? new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString() 
    : "No active subscription";

  const accountCreatedDate = new Date().toLocaleDateString(); // In real app, this would come from user data

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-24 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Account Profile</h1>
            <Button variant="ghost" onClick={signOut}>Sign Out</Button>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <User size={24} />
                    User Information
                  </CardTitle>
                  <CardDescription>View and manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Full Name</Label>
                      <div className="font-medium">{user.name || "Not provided"}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Email Address</Label>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Account Created</Label>
                      <div className="font-medium">{accountCreatedDate}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Account Type</Label>
                      <div className="font-medium capitalize">{subscriptionStatus}</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={() => setPasswordDialogOpen(true)} className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <CreditCard size={24} />
                    Billing Information
                  </CardTitle>
                  <CardDescription>Manage your subscription and payment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Subscription Plan</Label>
                      <div className="font-medium capitalize">{subscriptionStatus}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Remaining Prompts</Label>
                      <div className="font-medium">{user.promptsRemaining || "Unlimited"}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Next Billing Date</Label>
                      <div className="font-medium">{nextBillingDate}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Payment Method</Label>
                      <div className="font-medium">
                        {subscriptionStatus !== "free" ? "Credit Card (•••• 4242)" : "None"}
                      </div>
                    </div>
                  </div>
                  
                  {subscriptionStatus !== "premium" && (
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6">
                      <div className="mb-2">
                        <Label className="font-medium">Upgrade Your Plan</Label>
                      </div>
                      <UpgradePrompt currentTier={subscriptionStatus as "free" | "registered" | "premium"} />
                    </div>
                  )}
                  
                  {subscriptionStatus !== "free" && (
                    <div className="pt-4">
                      <Button variant="outline" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment Method
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="invoices">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileInvoice size={24} />
                    Invoices
                  </CardTitle>
                  <CardDescription>View your billing history</CardDescription>
                </CardHeader>
                <CardContent>
                  {subscriptionStatus === "free" ? (
                    <div className="text-muted-foreground py-4">
                      No invoices available with a free account. Upgrade to access premium features.
                      <div className="mt-4">
                        <Button asChild>
                          <a href="/pricing">View Pricing</a>
                        </Button>
                      </div>
                    </div>
                  ) : mockInvoices.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-muted-foreground py-4">
                      No invoices found.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Info size={24} />
                Account Usage
              </CardTitle>
              <CardDescription>Overview of your prompt usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">Prompts Used This Month</div>
                <div>{user.subscription === "premium" ? "Unlimited" : (5 - (user.promptsRemaining || 0)) + "/5"}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Prompts Remaining</div>
                <div>{user.subscription === "premium" ? "Unlimited" : user.promptsRemaining || 0}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Account Creation Date</div>
                <div>{accountCreatedDate}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Templates Created</div>
                <div>3</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            {passwordError && (
              <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
                {passwordError}
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password">Current Password</Label>
                <Input
                  id="old-password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
