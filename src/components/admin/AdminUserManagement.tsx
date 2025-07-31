import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Search, Plus, Edit, Trash2, Crown, User, Download, UserCheck, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  subscription: "free" | "registered" | "premium";
  promptsUsed: number;
  promptsRemaining: number;
  joinDate: string;
  lastActive: string;
  totalSpent: number;
  status: "active" | "inactive";
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      subscription: "free" as "free" | "registered" | "premium",
      promptsRemaining: 2,
    },
  });

  useEffect(() => {
    // Mock user data - in a real app, this would be fetched from an API
    const mockUsers: AdminUser[] = [
      {
        id: "1",
        email: "john@example.com",
        name: "John Doe",
        subscription: "premium",
        promptsUsed: 45,
        promptsRemaining: 999,
        joinDate: "2024-01-15",
        lastActive: "2024-01-20",
        totalSpent: 29.99,
        status: "active",
      },
      {
        id: "2",
        email: "jane@example.com",
        name: "Jane Smith",
        subscription: "registered",
        promptsUsed: 3,
        promptsRemaining: 2,
        joinDate: "2024-01-18",
        lastActive: "2024-01-19",
        totalSpent: 0,
        status: "active",
      },
      {
        id: "3",
        email: "bob@example.com",
        name: "Bob Wilson",
        subscription: "free",
        promptsUsed: 2,
        promptsRemaining: 0,
        joinDate: "2024-01-20",
        lastActive: "2024-01-20",
        totalSpent: 0,
        status: "inactive",
      },
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubscriptionBadge = (subscription: string) => {
    const variants = {
      free: "secondary",
      registered: "default",
      premium: "default",
    } as const;

    const colors = {
      free: "text-muted-foreground",
      registered: "text-blue-600",
      premium: "text-yellow-600",
    } as const;

    return (
      <Badge variant={variants[subscription as keyof typeof variants]} className={colors[subscription as keyof typeof colors]}>
        {subscription === "premium" && <Crown className="w-3 h-3 mr-1" />}
        {subscription.charAt(0).toUpperCase() + subscription.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"} className={status === "active" ? "text-green-600" : "text-red-600"}>
        {status === "active" ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    form.reset({
      email: user.email,
      name: user.name,
      subscription: user.subscription,
      promptsRemaining: user.promptsRemaining,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been successfully deleted.",
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === "active" ? "inactive" : "active";
    toast({
      title: "User status updated",
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    });
  };

  const handleExportUsers = () => {
    const csvContent = [
      ["Name", "Email", "Subscription", "Status", "Prompts Used", "Prompts Remaining", "Join Date", "Last Active", "Total Spent"],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.subscription,
        user.status,
        user.promptsUsed.toString(),
        user.subscription === "premium" ? "Unlimited" : user.promptsRemaining.toString(),
        user.joinDate,
        user.lastActive,
        `$${user.totalSpent.toFixed(2)}`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export completed",
      description: "User data has been exported to CSV.",
    });
  };

  interface UserFormData {
    email: string;
    name: string;
    subscription: "free" | "registered" | "premium";
    promptsRemaining: number;
  }

  const handleSaveUser = (data: UserFormData) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data }
          : user
      ));
      toast({
        title: "User updated",
        description: "User has been successfully updated.",
      });
    } else {
      // Add new user
      const newUser: AdminUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        promptsUsed: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        totalSpent: 0,
        status: "active",
      };
      setUsers([...users, newUser]);
      toast({
        title: "User added",
        description: "New user has been successfully added.",
      });
    }
    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
    setSelectedUser(null);
    form.reset();
  };

  const stats = {
    total: users.length,
    free: users.filter(u => u.subscription === "free").length,
    registered: users.filter(u => u.subscription === "registered").length,
    premium: users.filter(u => u.subscription === "premium").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.free}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.registered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premium}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex space-x-2">
              <Button onClick={handleExportUsers} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setSelectedUser(null); form.reset(); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveUser)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subscription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subscription</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="registered">Registered</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="promptsRemaining"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prompts Remaining</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add User</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prompts Used</TableHead>
                <TableHead>Prompts Remaining</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.promptsUsed}</TableCell>
                  <TableCell>{user.subscription === "premium" ? "Unlimited" : user.promptsRemaining}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={user.status === "active" ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                        aria-label={user.status === "active" ? `Deactivate user ${user.name}` : `Activate user ${user.name}`}
                      >
                        {user.status === "active" ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        aria-label={`Edit user ${user.name}`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                        aria-label={`Delete user ${user.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subscription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="registered">Registered</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="promptsRemaining"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompts Remaining</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserManagement;