import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Plan, getPlanConfig } from '@/config/planMatrix';
import { Settings } from 'lucide-react';

interface AdvancedOptionsPanelProps {
  userPlan: Plan;
  options: {
    temperature: number;
    topP: number;
    maxTokens: number;
    frequencyPenalty: number;
    presencePenalty: number;
    streamResponse: boolean;
  };
  onOptionsChange: (options: any) => void;
}

const AdvancedOptionsPanel: React.FC<AdvancedOptionsPanelProps> = ({
  userPlan,
  options,
  onOptionsChange,
}) => {
  const planConfig = getPlanConfig(userPlan);
  
  // Don't show advanced options for free tier
  if (planConfig.advOpts === "none") {
    return null;
  }

  const isLimited = planConfig.advOpts === "limited";
  const isFull = planConfig.advOpts === "full";

  const updateOption = (key: string, value: number | boolean) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <Card className="border-purple-200 bg-purple-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          Advanced Options
          {isLimited && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              Limited
            </span>
          )}
          {isFull && (
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Always show temperature and top_p for registered+ */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Temperature: {options.temperature}
          </Label>
          <Slider
            value={[options.temperature]}
            onValueChange={(value) => updateOption('temperature', value[0])}
            min={0}
            max={2}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Controls randomness. Lower = more focused, Higher = more creative
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Top P: {options.topP}
          </Label>
          <Slider
            value={[options.topP]}
            onValueChange={(value) => updateOption('topP', value[0])}
            min={0}
            max={1}
            step={0.05}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Nucleus sampling. Lower = more deterministic
          </p>
        </div>

        {/* Premium-only options */}
        {isFull && (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Max Tokens: {options.maxTokens}
              </Label>
              <Slider
                value={[options.maxTokens]}
                onValueChange={(value) => updateOption('maxTokens', value[0])}
                min={100}
                max={4000}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Maximum length of the response
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Frequency Penalty: {options.frequencyPenalty}
              </Label>
              <Slider
                value={[options.frequencyPenalty]}
                onValueChange={(value) => updateOption('frequencyPenalty', value[0])}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Reduces repetition of tokens based on frequency
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Presence Penalty: {options.presencePenalty}
              </Label>
              <Slider
                value={[options.presencePenalty]}
                onValueChange={(value) => updateOption('presencePenalty', value[0])}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Reduces repetition based on presence in text
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="stream-response"
                checked={options.streamResponse}
                onCheckedChange={(checked) => updateOption('streamResponse', checked)}
              />
              <Label htmlFor="stream-response" className="text-sm font-medium">
                Stream Response
              </Label>
            </div>
          </>
        )}

        {isLimited && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700">
              Upgrade to Premium to access all advanced options including token limits, penalties, and streaming.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedOptionsPanel;