import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePromptManagementStore } from '@/stores/promptManagementStore';
import { DiffBadge } from '@/components/prompt-management/DiffBadge';
import { parseCSV, validateAndProcessRows, generateImportSummary, generateCleanCSV, generateErrorCSV, downloadBlob } from '@/utils/csv-utils';
import { ParsedRow, ImportOptions } from '@/types/prompt-management';
import { Upload, Download, FileCheck, AlertCircle } from 'lucide-react';

export default function PromptManagementBulkImport() {
  const { categories, prompts, applyValidRows } = usePromptManagementStore();
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ImportOptions>({
    autoCreateCategories: true,
    treatEmptyAsNoChange: true,
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const rawData = await parseCSV(selectedFile);
      const processedRows = validateAndProcessRows(rawData, prompts, categories, options.autoCreateCategories);
      setParsedRows(processedRows);
    } catch (error) {
      console.error('Error parsing CSV:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyImport = () => {
    const validRows = parsedRows.filter(row => row._action !== 'INVALID');
    applyValidRows(validRows, options);
    setParsedRows([]);
    setFile(null);
  };

  const summary = parsedRows.length > 0 ? generateImportSummary(parsedRows) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bulk Import</h1>
        <p className="text-muted-foreground">
          Import prompts from CSV files with validation and preview
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your CSV file here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Supports .csv files. Maximum file size: 10MB
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <Button asChild className="mt-4">
                <label htmlFor="csv-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {/* Import Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="autoCreate"
                checked={options.autoCreateCategories}
                onCheckedChange={(checked) => 
                  setOptions(prev => ({ ...prev, autoCreateCategories: checked }))
                }
              />
              <Label htmlFor="autoCreate">Auto-create categories</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="treatEmpty"
                checked={options.treatEmptyAsNoChange}
                onCheckedChange={(checked) => 
                  setOptions(prev => ({ ...prev, treatEmptyAsNoChange: checked }))
                }
              />
              <Label htmlFor="treatEmpty">Treat empty fields as no-change</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Import Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{summary.totalRows}</div>
                <div className="text-sm text-muted-foreground">Total Rows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.validRows}</div>
                <div className="text-sm text-muted-foreground">Valid Rows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.invalidRows}</div>
                <div className="text-sm text-muted-foreground">Invalid Rows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.insertCount}</div>
                <div className="text-sm text-muted-foreground">New Prompts</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleApplyImport} disabled={summary.validRows === 0}>
                Apply Import ({summary.validRows} rows)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadBlob(generateCleanCSV(parsedRows), 'clean-prompts.csv', 'text/csv')}
                disabled={summary.validRows === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Clean CSV
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadBlob(generateErrorCSV(parsedRows), 'import-errors.csv', 'text/csv')}
                disabled={summary.invalidRows === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Errors
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Table */}
      {parsedRows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview ({parsedRows.length} rows)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedRows.slice(0, 20).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <DiffBadge action={row._action} />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{row.title}</div>
                        <div className="text-sm text-muted-foreground">{row.slug}</div>
                      </TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        {row._errors.length > 0 && (
                          <div className="space-y-1">
                            {row._errors.map((error, i) => (
                              <div key={i} className="text-xs text-red-600">
                                {error.field}: {error.message}
                              </div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}