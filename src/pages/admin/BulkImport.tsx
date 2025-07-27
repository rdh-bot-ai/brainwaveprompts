import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ChevronDown,
  X
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DiffBadge } from '@/components/admin/DiffBadge';
import { PlanBadge } from '@/components/admin/PlanBadge';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  parseCSVFile, 
  generateCleanCSV, 
  generateErrorCSV, 
  downloadCSV,
  SAMPLE_CSV_CONTENT 
} from '@/utils/csv-parser';
import { getStoredPrompts } from '@/data/admin-stubs';
import { UploadState, Prompt } from '@/types/admin-types';
import { useToast } from '@/hooks/use-toast';

export const BulkImport: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    isProcessing: false,
    results: null,
    diffMode: null,
  });
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    errors: false,
    preview: true,
  });

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a CSV file',
        variant: 'destructive',
      });
      return;
    }

    setUploadState(prev => ({
      ...prev,
      file,
      isProcessing: true,
      results: null,
    }));

    try {
      const results = await parseCSVFile(file);
      
      setUploadState(prev => ({
        ...prev,
        isProcessing: false,
        results,
      }));

      toast({
        title: 'File processed',
        description: `Found ${results.validRows.length} valid rows, ${results.invalidRows.length} errors`,
      });
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isProcessing: false,
      }));

      toast({
        title: 'Processing failed',
        description: 'Failed to process the CSV file',
        variant: 'destructive',
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setUploadState({
      file: null,
      isProcessing: false,
      results: null,
      diffMode: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadSample = () => {
    downloadCSV(SAMPLE_CSV_CONTENT, 'sample-prompts.csv');
  };

  const handleDownloadClean = () => {
    if (!uploadState.results?.validRows) return;
    const cleanCSV = generateCleanCSV(uploadState.results.validRows);
    downloadCSV(cleanCSV, 'clean-prompts.csv');
  };

  const handleDownloadErrors = () => {
    if (!uploadState.results?.invalidRows) return;
    const errorCSV = generateErrorCSV(uploadState.results.invalidRows);
    downloadCSV(errorCSV, 'import-errors.csv');
  };

  const getDiffType = (prompt: Prompt): 'INSERT' | 'UPDATE' => {
    const existingPrompts = getStoredPrompts();
    const exists = existingPrompts.some(p => p.slug === prompt.slug);
    return exists ? 'UPDATE' : 'INSERT';
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const { file, isProcessing, results } = uploadState;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bulk Import</h1>
          <p className="text-muted-foreground">
            Import prompts from CSV files with validation and preview
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>
              Upload a CSV file to import prompts. File must be UTF-8 encoded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button 
                onClick={handleUploadClick}
                disabled={isProcessing}
              >
                <Upload className="h-4 w-4 mr-2" />
                {file ? 'Change File' : 'Select CSV File'}
              </Button>

              <Button 
                variant="outline" 
                onClick={handleDownloadSample}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Sample
              </Button>

              {file && (
                <Button 
                  variant="outline" 
                  onClick={handleClearFile}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>

            {file && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
                <Badge variant="outline">{(file.size / 1024).toFixed(1)} KB</Badge>
                {isProcessing && (
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    Processing...
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <>
            {/* Summary */}
            <Card>
              <Collapsible 
                open={expandedSections.summary}
                onOpenChange={() => toggleSection('summary')}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-accent/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Summary
                      </CardTitle>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.summary ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center p-4 bg-muted rounded-md">
                        <div className="text-2xl font-bold">{results.totalRows}</div>
                        <div className="text-sm text-muted-foreground">Total Rows</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-md">
                        <div className="text-2xl font-bold text-green-700">{results.validRows.length}</div>
                        <div className="text-sm text-muted-foreground">Valid Rows</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-md">
                        <div className="text-2xl font-bold text-red-700">{results.invalidRows.length}</div>
                        <div className="text-sm text-muted-foreground">Invalid Rows</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-md">
                        <div className="text-2xl font-bold text-blue-700">{results.categoriesDetected.length}</div>
                        <div className="text-sm text-muted-foreground">Categories</div>
                      </div>
                    </div>

                    {results.categoriesDetected.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Categories Detected:</h4>
                        <div className="flex flex-wrap gap-2">
                          {results.categoriesDetected.map(category => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={handleDownloadClean}
                        disabled={results.validRows.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Clean CSV
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={handleDownloadErrors}
                        disabled={results.invalidRows.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Error Report
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Errors */}
            {results.invalidRows.length > 0 && (
              <Card>
                <Collapsible 
                  open={expandedSections.errors}
                  onOpenChange={() => toggleSection('errors')}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          Validation Errors ({results.invalidRows.length})
                        </CardTitle>
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.errors ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="rounded-md border max-h-64 overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Row</TableHead>
                              <TableHead>Field</TableHead>
                              <TableHead>Error</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {results.invalidRows.map((error, index) => (
                              <TableRow key={index}>
                                <TableCell>{error.row}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{error.field}</Badge>
                                </TableCell>
                                <TableCell className="text-red-700">
                                  {error.message}
                                </TableCell>
                                <TableCell className="max-w-48 truncate">
                                  {error.value?.toString() || 'N/A'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}

            {/* Preview */}
            {results.validRows.length > 0 && (
              <Card>
                <Collapsible 
                  open={expandedSections.preview}
                  onOpenChange={() => toggleSection('preview')}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Valid Rows Preview ({results.validRows.length})
                        </CardTitle>
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.preview ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="rounded-md border max-h-96 overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Operation</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Visibility</TableHead>
                              <TableHead>Content</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {results.validRows.map((prompt, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <DiffBadge type={getDiffType(prompt)} />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {prompt.title}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {prompt.category_slug}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <StatusBadge status={prompt.status} />
                                </TableCell>
                                <TableCell>
                                  <PlanBadge plan={prompt.visibility} />
                                </TableCell>
                                <TableCell className="max-w-64 truncate">
                                  {prompt.content}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}
          </>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>CSV Format Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Required Headers (exact order):</h4>
                <div className="text-sm font-mono bg-muted p-2 rounded">
                  slug,title,short_description,content,category_slug,category_name,category_description,visibility,status,tags,is_featured,sort_order,version
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Visibility Values:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ANON - Anonymous users</li>
                    <li>• FREE - Free tier users</li>
                    <li>• PREMIUM - Premium users</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status Values:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• DRAFT - Not published</li>
                    <li>• PUBLISHED - Live content</li>
                    <li>• ARCHIVED - Hidden content</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Notes:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Tags: separate with | or , (comma)</li>
                  <li>• Booleans: use "true" or "false"</li>
                  <li>• Numbers: sort_order and version must be integers</li>
                  <li>• File encoding: UTF-8 required</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};