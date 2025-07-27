import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { usePromptManagementStore } from '@/stores/promptManagementStore';
import { PlanBadge } from '@/components/prompt-management/PlanBadge';
import { StatusBadge } from '@/components/prompt-management/StatusBadge';
import { TagChips } from '@/components/prompt-management/TagChips';
import { Prompt, PlanTier, PromptStatus } from '@/types/prompt-management';
import { Plus, Edit, Copy, Archive, Eye, Search, Filter } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const promptFormSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be kebab-case'),
  title: z.string().min(1).max(120),
  shortDescription: z.string().max(200).optional(),
  content: z.string().min(1),
  categorySlug: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  visibility: z.enum(['ANON', 'FREE', 'PREMIUM']),
  tags: z.array(z.string().min(1)).optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

type PromptFormData = z.infer<typeof promptFormSchema>;

export default function PromptManagementPrompts() {
  const { 
    prompts, 
    categories, 
    addPrompt, 
    updatePrompt, 
    duplicatePrompt, 
    archivePrompt 
  } = usePromptManagementStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PromptStatus | 'ALL'>('ALL');
  const [visibilityFilter, setVisibilityFilter] = useState<PlanTier | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      slug: '',
      title: '',
      shortDescription: '',
      content: '',
      categorySlug: '',
      status: 'DRAFT',
      visibility: 'FREE',
      tags: [],
      isFeatured: false,
      sortOrder: 0,
    }
  });

  const watchedTitle = watch('title');

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchedTitle && !editingPrompt) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchedTitle, editingPrompt, setValue]);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'ALL' || prompt.status === statusFilter;
    const matchesVisibility = visibilityFilter === 'ALL' || prompt.visibility === visibilityFilter;
    const matchesCategory = categoryFilter === 'ALL' || prompt.categorySlug === categoryFilter;

    return matchesSearch && matchesStatus && matchesVisibility && matchesCategory;
  });

  const handleCreatePrompt = () => {
    setEditingPrompt(null);
    reset();
    setIsSheetOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    reset(prompt);
    setIsSheetOpen(true);
  };

  const handleSavePrompt = (data: PromptFormData) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, data);
    } else {
      addPrompt(data);
    }
    setIsSheetOpen(false);
    reset();
    setEditingPrompt(null);
  };

  const getCategoryName = (slug: string) => {
    return categories.find(c => c.slug === slug)?.name || slug;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prompts</h1>
          <p className="text-muted-foreground">
            Manage prompt library and content
          </p>
        </div>
        
        <Button onClick={handleCreatePrompt}>
          <Plus className="mr-2 h-4 w-4" />
          Create Prompt
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value: PromptStatus | 'ALL') => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={visibilityFilter} onValueChange={(value: PlanTier | 'ALL') => setVisibilityFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Plans</SelectItem>
                <SelectItem value="ANON">Public</SelectItem>
                <SelectItem value="FREE">Free</SelectItem>
                <SelectItem value="PREMIUM">Premium</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredPrompts.length} results
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Prompts ({filteredPrompts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{prompt.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {prompt.shortDescription}
                      </div>
                      {prompt.tags && prompt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {prompt.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {prompt.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{prompt.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getCategoryName(prompt.categorySlug)}
                    </div>
                    <code className="text-xs text-muted-foreground">
                      {prompt.categorySlug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <PlanBadge plan={prompt.visibility} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={prompt.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">v{prompt.version}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {prompt.updatedAt ? new Date(prompt.updatedAt).toLocaleDateString() : '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditPrompt(prompt)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => duplicatePrompt(prompt.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      
                      {prompt.status !== 'ARCHIVED' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => archivePrompt(prompt.id)}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingPrompt ? 'Edit Prompt' : 'Create Prompt'}
            </SheetTitle>
          </SheetHeader>
          
          <form onSubmit={handleSubmit(handleSavePrompt)} className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Research Assistant — Problem Framing"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...register('slug')}
                  placeholder="research-assistant-problem-framing"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                {...register('shortDescription')}
                placeholder="Turn vague asks into tight research questions and a search plan."
              />
              {errors.shortDescription && (
                <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register('content')}
                placeholder="Enter the prompt content..."
                rows={8}
                className="font-mono text-sm"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="categorySlug">Category</Label>
                <Select
                  value={watch('categorySlug')}
                  onValueChange={(value) => setValue('categorySlug', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categorySlug && (
                  <p className="text-sm text-destructive">{errors.categorySlug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={watch('status')}
                  onValueChange={(value: PromptStatus) => setValue('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={watch('visibility')}
                  onValueChange={(value: PlanTier) => setValue('visibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ANON">Public</SelectItem>
                    <SelectItem value="FREE">Free</SelectItem>
                    <SelectItem value="PREMIUM">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagChips
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Add tags (research, evidence, planning...)"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  {...register('sortOrder', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="isFeatured"
                  {...register('isFeatured')}
                />
                <Label htmlFor="isFeatured">Featured Prompt</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingPrompt ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}