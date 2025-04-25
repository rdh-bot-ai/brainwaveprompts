
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CodeFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const CodeForm: React.FC<CodeFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="language">Programming Language</Label>
        <Select
          name="language"
          value={formData.language || ""}
          onValueChange={(value) => onChange("language", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="php">PHP</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="swift">Swift</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="functionality">Functionality Description</Label>
        <Textarea
          name="functionality"
          placeholder="Describe what your code should do..."
          value={formData.functionality || ""}
          onChange={handleChange}
          className="min-h-[120px]"
        />
      </div>
      
      <div className="mb-4 flex flex-row items-center justify-between">
        <Label htmlFor="includeComments">Include Comments</Label>
        <Switch
          id="includeComments"
          checked={formData.includeComments || true}
          onCheckedChange={(checked) => onChange("includeComments", checked)}
        />
      </div>
      
      <div className="mb-4 flex flex-row items-center justify-between">
        <Label htmlFor="optimizePerformance">Optimize for Performance</Label>
        <Switch
          id="optimizePerformance"
          checked={formData.optimizePerformance || false}
          onCheckedChange={(checked) => onChange("optimizePerformance", checked)}
        />
      </div>
    </>
  );
};

export default CodeForm;
