import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, AlertTriangle, Settings } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: "Brainwave Prompts",
    maintenanceMode: false,
    signupEnabled: true,
    freeTrialEnabled: true,
    
    // Subscription Limits
    freeTierPrompts: 2,
    registeredTierPrompts: 5,
    premiumTierPrompts: -1, // -1 for unlimited
    
    // OpenAI Settings
    openaiModel: "gpt-4",
    maxTokens: 4000,
    temperature: 0.7,
    
    // Email Settings
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    
    // Notification Settings
    emailNotifications: true,
    slackWebhook: "",
    
    // Analytics
    trackingEnabled: true,
    dataRetentionDays: 90,
    
    // Security
    sessionTimeout: 24, // hours
    maxLoginAttempts: 5,
    requireEmailVerification: true,
    
    // Custom Messages
    welcomeMessage: "Welcome to Brainwave Prompts! Start creating amazing prompts with AI assistance.",
    maintenanceMessage: "We're currently performing maintenance. Please check back soon.",
  });

  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Settings saved",
      description: "All settings have been successfully updated.",
    });
  };

  const handleResetSettings = () => {
    // Reset to default values
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange("platformName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="signupEnabled">Enable Signups</Label>
              <Switch
                id="signupEnabled"
                checked={settings.signupEnabled}
                onCheckedChange={(checked) => handleSettingChange("signupEnabled", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freeTierPrompts">Free Tier Prompts</Label>
              <Input
                id="freeTierPrompts"
                type="number"
                value={settings.freeTierPrompts}
                onChange={(e) => handleSettingChange("freeTierPrompts", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registeredTierPrompts">Registered Tier Prompts</Label>
              <Input
                id="registeredTierPrompts"
                type="number"
                value={settings.registeredTierPrompts}
                onChange={(e) => handleSettingChange("registeredTierPrompts", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="premiumTierPrompts">Premium Tier Prompts (-1 for unlimited)</Label>
              <Input
                id="premiumTierPrompts"
                type="number"
                value={settings.premiumTierPrompts}
                onChange={(e) => handleSettingChange("premiumTierPrompts", parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OpenAI Settings */}
      <Card>
        <CardHeader>
          <CardTitle>OpenAI Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openaiModel">OpenAI Model</Label>
              <Select value={settings.openaiModel} onValueChange={(value) => handleSettingChange("openaiModel", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                value={settings.maxTokens}
                onChange={(e) => handleSettingChange("maxTokens", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={settings.temperature}
                onChange={(e) => handleSettingChange("temperature", parseFloat(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange("maxLoginAttempts", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataRetentionDays">Data Retention (days)</Label>
              <Input
                id="dataRetentionDays"
                type="number"
                value={settings.dataRetentionDays}
                onChange={(e) => handleSettingChange("dataRetentionDays", parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
            <Switch
              id="requireEmailVerification"
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Custom Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => handleSettingChange("welcomeMessage", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
            <Textarea
              id="maintenanceMessage"
              value={settings.maintenanceMessage}
              onChange={(e) => handleSettingChange("maintenanceMessage", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
            <Input
              id="slackWebhook"
              type="url"
              value={settings.slackWebhook}
              onChange={(e) => handleSettingChange("slackWebhook", e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetSettings}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Maintenance Mode Warning */}
      {settings.maintenanceMode && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-medium">
                Maintenance mode is enabled. Users will see the maintenance message and won't be able to use the platform.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSettings;