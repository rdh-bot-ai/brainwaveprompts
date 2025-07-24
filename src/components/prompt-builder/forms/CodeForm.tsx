
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CodeFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const CodeForm: React.FC<CodeFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  // Common fields for all code types
  const renderCommonFields = () => (
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
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="kotlin">Kotlin</SelectItem>
            <SelectItem value="sql">SQL</SelectItem>
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
    </>
  );

  // Subcategory-specific fields
  const renderSubcategoryFields = () => {
    switch (subCategory) {
      case "function":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="parameters">Input Parameters</Label>
              <Textarea
                name="parameters"
                placeholder="Describe expected inputs, types, validation requirements..."
                value={formData.parameters || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="returnType">Return Type/Output</Label>
              <Input
                name="returnType"
                placeholder="What should the function return?"
                value={formData.returnType || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="errorHandling">Error Handling Requirements</Label>
              <Textarea
                name="errorHandling"
                placeholder="Specify error cases, edge cases, validation needs..."
                value={formData.errorHandling || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "component":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="framework">UI Framework/Library</Label>
              <Select
                value={formData.framework || ""}
                onValueChange={(value) => onChange("framework", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="vanilla">Vanilla JS</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="props">Props/Parameters</Label>
              <Textarea
                name="props"
                placeholder="Describe component props, their types, and default values..."
                value={formData.props || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="styling">Styling Approach</Label>
              <Select
                value={formData.styling || ""}
                onValueChange={(value) => onChange("styling", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select styling method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="css-modules">CSS Modules</SelectItem>
                  <SelectItem value="styled-components">Styled Components</SelectItem>
                  <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                  <SelectItem value="scss">SCSS/SASS</SelectItem>
                  <SelectItem value="css">Plain CSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "algorithm":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="complexity">Performance Requirements</Label>
              <Textarea
                name="complexity"
                placeholder="Time complexity requirements, data size expectations..."
                value={formData.complexity || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="constraints">Algorithm Constraints</Label>
              <Textarea
                name="constraints"
                placeholder="Memory limits, space complexity, specific algorithm preferences..."
                value={formData.constraints || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "api":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="apiService">API/Service Name</Label>
              <Input
                name="apiService"
                placeholder="Which API or service are you integrating with?"
                value={formData.apiService || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="authMethod">Authentication Method</Label>
              <Select
                value={formData.authMethod || ""}
                onValueChange={(value) => onChange("authMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api-key">API Key</SelectItem>
                  <SelectItem value="oauth">OAuth 2.0</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="jwt">JWT</SelectItem>
                  <SelectItem value="none">No Authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="endpoints">Specific Endpoints</Label>
              <Textarea
                name="endpoints"
                placeholder="List specific API endpoints you need to work with..."
                value={formData.endpoints || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "testing":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="testFramework">Testing Framework</Label>
              <Select
                value={formData.testFramework || ""}
                onValueChange={(value) => onChange("testFramework", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select testing framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jest">Jest</SelectItem>
                  <SelectItem value="mocha">Mocha</SelectItem>
                  <SelectItem value="pytest">PyTest</SelectItem>
                  <SelectItem value="junit">JUnit</SelectItem>
                  <SelectItem value="rspec">RSpec</SelectItem>
                  <SelectItem value="phpunit">PHPUnit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="testTypes">Test Types Needed</Label>
              <Textarea
                name="testTypes"
                placeholder="Unit tests, integration tests, edge cases, performance tests..."
                value={formData.testTypes || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="codeToTest">Code to Test</Label>
              <Textarea
                name="codeToTest"
                placeholder="Paste the code you want tests for (optional)..."
                value={formData.codeToTest || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </>
        );
      
      case "refactor":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="currentCode">Code to Refactor</Label>
              <Textarea
                name="currentCode"
                placeholder="Paste the code that needs refactoring..."
                value={formData.currentCode || ""}
                onChange={handleChange}
                className="min-h-[150px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="refactorGoals">Refactoring Goals</Label>
              <Textarea
                name="refactorGoals"
                placeholder="Performance, readability, maintainability, design patterns..."
                value={formData.refactorGoals || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "database":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="databaseType">Database Type</Label>
              <Select
                value={formData.databaseType || ""}
                onValueChange={(value) => onChange("databaseType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select database" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mongodb">MongoDB</SelectItem>
                  <SelectItem value="sqlite">SQLite</SelectItem>
                  <SelectItem value="oracle">Oracle</SelectItem>
                  <SelectItem value="sqlserver">SQL Server</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="operation">Database Operation</Label>
              <Select
                value={formData.operation || ""}
                onValueChange={(value) => onChange("operation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select">SELECT - Data Retrieval</SelectItem>
                  <SelectItem value="insert">INSERT - Add Data</SelectItem>
                  <SelectItem value="update">UPDATE - Modify Data</SelectItem>
                  <SelectItem value="delete">DELETE - Remove Data</SelectItem>
                  <SelectItem value="schema">Schema Design</SelectItem>
                  <SelectItem value="migration">Migration</SelectItem>
                  <SelectItem value="optimization">Query Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="requirements">Data Requirements</Label>
              <Textarea
                name="requirements"
                placeholder="Tables involved, relationships, performance needs, constraints..."
                value={formData.requirements || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {renderCommonFields()}
      {renderSubcategoryFields()}
      
      {/* Common code preferences */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="mb-4 flex flex-row items-center justify-between">
          <Label htmlFor="includeComments">Include Detailed Comments</Label>
          <Switch
            id="includeComments"
            checked={formData.includeComments !== false}
            onCheckedChange={(checked) => onChange("includeComments", checked)}
          />
        </div>
        
        <div className="mb-4 flex flex-row items-center justify-between">
          <Label htmlFor="optimizePerformance">Focus on Performance</Label>
          <Switch
            id="optimizePerformance"
            checked={formData.optimizePerformance || false}
            onCheckedChange={(checked) => onChange("optimizePerformance", checked)}
          />
        </div>
        
        <div className="mb-4 flex flex-row items-center justify-between">
          <Label htmlFor="includeExamples">Include Usage Examples</Label>
          <Switch
            id="includeExamples"
            checked={formData.includeExamples !== false}
            onCheckedChange={(checked) => onChange("includeExamples", checked)}
          />
        </div>
      </div>
    </>
  );
};

export default CodeForm;
