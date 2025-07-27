import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip as TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { DollarSign, Zap, TrendingUp, Users, Crown, Activity, Info, CreditCard, Target, PieChart as PieChartIcon } from "lucide-react";
import { getRevenueCostSummary, getRevenuePoints, getTokenPointsByPlan, type RevenueCostSummary } from "@/lib/analytics/revenueCostAdapters";

interface AnalyticsData {
  month: string;
  totalUsage: number;
  totalCost: number;
  promptsGenerated: number;
  activeUsers: number;
}

interface UserUsageData {
  userId: string;
  email: string;
  name: string;
  subscription: "free" | "registered" | "premium";
  promptsUsed: number;
  estimatedCost: number;
  lastActive: string;
}

interface AdminAnalyticsProps {
  showBilling?: boolean;
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ showBilling = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("last6months");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [userUsageData, setUserUsageData] = useState<UserUsageData[]>([]);
  const [revenueCostView, setRevenueCostView] = useState<'summary' | 'revenue' | 'cost' | 'tokens'>('summary');
  const [revenueCostData, setRevenueCostData] = useState<RevenueCostSummary | null>(null);

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics: AnalyticsData[] = [
      { month: "Aug 2023", totalUsage: 15420, totalCost: 308.40, promptsGenerated: 1234, activeUsers: 89 },
      { month: "Sep 2023", totalUsage: 18950, totalCost: 379.00, promptsGenerated: 1456, activeUsers: 112 },
      { month: "Oct 2023", totalUsage: 22140, totalCost: 442.80, promptsGenerated: 1678, activeUsers: 134 },
      { month: "Nov 2023", totalUsage: 26780, totalCost: 535.60, promptsGenerated: 1923, activeUsers: 156 },
      { month: "Dec 2023", totalUsage: 31250, totalCost: 625.00, promptsGenerated: 2145, activeUsers: 178 },
      { month: "Jan 2024", totalUsage: 35670, totalCost: 713.40, promptsGenerated: 2387, activeUsers: 201 },
    ];

    const mockUserUsage: UserUsageData[] = [
      {
        userId: "1",
        email: "john@example.com",
        name: "John Doe",
        subscription: "premium",
        promptsUsed: 245,
        estimatedCost: 49.00,
        lastActive: "2024-01-20",
      },
      {
        userId: "2",
        email: "sarah@company.com",
        name: "Sarah Wilson",
        subscription: "premium",
        promptsUsed: 189,
        estimatedCost: 37.80,
        lastActive: "2024-01-19",
      },
      {
        userId: "3",
        email: "mike@startup.io",
        name: "Mike Chen",
        subscription: "registered",
        promptsUsed: 87,
        estimatedCost: 17.40,
        lastActive: "2024-01-18",
      },
      {
        userId: "4",
        email: "lisa@marketing.com",
        name: "Lisa Brown",
        subscription: "premium",
        promptsUsed: 156,
        estimatedCost: 31.20,
        lastActive: "2024-01-17",
      },
      {
        userId: "5",
        email: "alex@design.co",
        name: "Alex Rodriguez",
        subscription: "registered",
        promptsUsed: 67,
        estimatedCost: 13.40,
        lastActive: "2024-01-16",
      },
    ];

    setAnalyticsData(mockAnalytics);
    setUserUsageData(mockUserUsage);
    
    // Load revenue and cost data
    const summary = getRevenueCostSummary(selectedPeriod);
    setRevenueCostData(summary);
  }, [selectedPeriod]);

  const currentMonth = analyticsData[analyticsData.length - 1];
  const previousMonth = analyticsData[analyticsData.length - 2];

  const growthMetrics = {
    usageGrowth: currentMonth && previousMonth 
      ? ((currentMonth.totalUsage - previousMonth.totalUsage) / previousMonth.totalUsage * 100).toFixed(1)
      : "0",
    costGrowth: currentMonth && previousMonth
      ? ((currentMonth.totalCost - previousMonth.totalCost) / previousMonth.totalCost * 100).toFixed(1)
      : "0",
    userGrowth: currentMonth && previousMonth
      ? ((currentMonth.activeUsers - previousMonth.activeUsers) / previousMonth.activeUsers * 100).toFixed(1)
      : "0",
  };

  const subscriptionData = [
    { name: "Free", value: 45, color: "#94a3b8" },
    { name: "Registered", value: 35, color: "#3b82f6" },
    { name: "Premium", value: 20, color: "#f59e0b" },
  ];

  const totalUsers = userUsageData.length;
  const totalCost = currentMonth?.totalCost || 0;
  const totalUsage = currentMonth?.totalUsage || 0;
  const averageCostPerUser = totalUsers > 0 ? (totalCost / totalUsers).toFixed(2) : "0";

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const renderRevenueCostCards = () => {
    if (!revenueCostData) return null;

    const EstimatedBadge = () => (
      revenueCostData.estimated ? (
        <TooltipProvider>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="ml-2 text-xs">
              <Info className="h-3 w-3 mr-1" />
              estimated
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Calculated using configured token rates</p>
          </TooltipContent>
        </TooltipProvider>
      ) : null
    );

    switch (revenueCostView) {
      case 'summary':
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue (Paid Users)</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(revenueCostData.totalRevenueCentsPaid)}</div>
                <p className="text-xs text-muted-foreground">
                  From paid subscriptions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total API Cost (All Users)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(revenueCostData.totalApiCostCentsAll)}
                  <EstimatedBadge />
                </div>
                <p className="text-xs text-muted-foreground">
                  OpenAI API costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tokens (All Users)</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(revenueCostData.totalTokensAll)}</div>
                <p className="text-xs text-muted-foreground">
                  Tokens consumed
                </p>
              </CardContent>
            </Card>
          </>
        );

      case 'revenue':
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue (Paid Users)</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(revenueCostData.totalRevenueCentsPaid)}</div>
                <p className="text-xs text-muted-foreground">
                  Gross revenue from subscriptions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">MRR (Paid)</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {revenueCostData.mrrCents ? formatCurrency(revenueCostData.mrrCents) : "—"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Monthly recurring revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ARPU (Paid)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {revenueCostData.arpuCents ? formatCurrency(revenueCostData.arpuCents) : "—"}
                  <TooltipProvider>
                    <TooltipTrigger asChild>
                      <Info className="inline h-3 w-3 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Revenue ÷ Paid Users for selected period</p>
                    </TooltipContent>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground">
                  Average revenue per user
                </p>
              </CardContent>
            </Card>
          </>
        );

      case 'cost':
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Cost — Paid Users</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(revenueCostData.apiCostCentsPaid)}
                  <EstimatedBadge />
                </div>
                <p className="text-xs text-muted-foreground">
                  Premium subscription costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Cost — Registered Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(revenueCostData.apiCostCentsRegistered)}
                  <EstimatedBadge />
                </div>
                <p className="text-xs text-muted-foreground">
                  Free registered user costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Cost — Free Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(revenueCostData.apiCostCentsFree)}
                  <EstimatedBadge />
                  <TooltipProvider>
                    <TooltipTrigger asChild>
                      <Info className="inline h-3 w-3 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Anonymous/unauthenticated user costs</p>
                    </TooltipContent>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anonymous user costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total API Cost — All Users</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(revenueCostData.totalApiCostCentsAll)}
                  <EstimatedBadge />
                </div>
                <p className="text-xs text-muted-foreground">
                  Sum of all segments
                </p>
              </CardContent>
            </Card>
          </>
        );

      case 'tokens':
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tokens — Paid Users</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(revenueCostData.tokensPaid)}</div>
                <p className="text-xs text-muted-foreground">
                  Premium user tokens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tokens — Registered Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(revenueCostData.tokensRegistered)}</div>
                <p className="text-xs text-muted-foreground">
                  Free registered tokens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tokens — Free Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(revenueCostData.tokensFree)}</div>
                <p className="text-xs text-muted-foreground">
                  Anonymous user tokens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tokens — All Users</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(revenueCostData.totalTokensAll)}</div>
                <p className="text-xs text-muted-foreground">
                  Sum of all segments
                </p>
              </CardContent>
            </Card>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {showBilling ? "Billing & Usage Analytics" : "Platform Analytics"}
        </h3>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last6months">Last 6 Months</SelectItem>
            <SelectItem value="last12months">Last 12 Months</SelectItem>
            <SelectItem value="thisyear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +{growthMetrics.costGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OpenAI Usage (Tokens)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +{growthMetrics.usageGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +{growthMetrics.userGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cost/User</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageCostPerUser}</div>
            <p className="text-xs text-muted-foreground">
              Per user this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Cost Breakdown Section - Only show when showBilling is true */}
      {showBilling && (
        <>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Revenue & Cost Breakdown</h3>
            
            {/* View Selector */}
            <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg w-fit">
              <Button
                variant={revenueCostView === 'summary' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRevenueCostView('summary')}
              >
                Summary
              </Button>
              <Button
                variant={revenueCostView === 'revenue' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRevenueCostView('revenue')}
              >
                Revenue
              </Button>
              <Button
                variant={revenueCostView === 'cost' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRevenueCostView('cost')}
              >
                Cost by Segment
              </Button>
              <Button
                variant={revenueCostView === 'tokens' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRevenueCostView('tokens')}
              >
                Tokens by Segment
              </Button>
            </div>

            {/* Dynamic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              {renderRevenueCostCards()}
            </div>
          </div>
        </>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Usage & Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="totalUsage" fill="#3b82f6" name="Tokens Used" />
                <Line yAxisId="right" type="monotone" dataKey="totalCost" stroke="#f59e0b" strokeWidth={2} name="Cost ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Users by Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Top Users by Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Prompts Used</TableHead>
                <TableHead>Estimated Cost</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userUsageData
                .sort((a, b) => b.promptsUsed - a.promptsUsed)
                .slice(0, 10)
                .map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.subscription === "premium" ? "default" : "secondary"}>
                        {user.subscription === "premium" && <Crown className="w-3 h-3 mr-1" />}
                        {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.promptsUsed}</TableCell>
                    <TableCell>${user.estimatedCost.toFixed(2)}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="promptsGenerated" fill="#3b82f6" name="Prompts Generated" />
              <Bar dataKey="activeUsers" fill="#10b981" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;