import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Prompt, PromptVersion, PlanTier, ImportOptions, ParsedRow } from '@/types/prompt-management';

interface PromptManagementState {
  // Data
  categories: Category[];
  prompts: Prompt[];
  promptVersions: PromptVersion[];
  planPreview: PlanTier;
  
  // Actions
  loadSeeds: () => Promise<void>;
  resetDemo: () => Promise<void>;
  setPlanPreview: (plan: PlanTier) => void;
  
  // Categories
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string, force?: boolean) => boolean;
  
  // Prompts
  addPrompt: (prompt: Omit<Prompt, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => void;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  duplicatePrompt: (id: string) => void;
  archivePrompt: (id: string) => void;
  
  // Versions
  addPromptVersion: (version: Omit<PromptVersion, 'id' | 'createdAt'>) => void;
  
  // Bulk Import
  applyValidRows: (rows: ParsedRow[], options: ImportOptions) => void;
}

const generateId = () => crypto.randomUUID();
const nowIso = () => new Date().toISOString();

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const usePromptManagementStore = create<PromptManagementState>()(
  persist(
    (set, get) => ({
      categories: [],
      prompts: [],
      promptVersions: [],
      planPreview: 'FREE',

      loadSeeds: async () => {
        try {
          const [categoriesRes, promptsRes, versionsRes] = await Promise.all([
            fetch('/samples/seed.categories.json'),
            fetch('/samples/seed.prompts.json'),
            fetch('/samples/seed.promptVersions.json')
          ]);

          const categories = await categoriesRes.json();
          const prompts = await promptsRes.json();
          const promptVersions = await versionsRes.json();

          set({ categories, prompts, promptVersions });
        } catch (error) {
          console.error('Failed to load seed data:', error);
        }
      },

      resetDemo: async () => {
        const { loadSeeds } = get();
        await loadSeeds();
      },

      setPlanPreview: (plan: PlanTier) => {
        set({ planPreview: plan });
      },

      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: generateId(),
          createdAt: nowIso(),
          updatedAt: nowIso(),
        };
        set(state => ({
          categories: [...state.categories, newCategory]
        }));
      },

      updateCategory: (id, updates) => {
        set(state => ({
          categories: state.categories.map(cat =>
            cat.id === id
              ? { ...cat, ...updates, updatedAt: nowIso() }
              : cat
          )
        }));
      },

      deleteCategory: (id, force = false) => {
        const { prompts } = get();
        const category = get().categories.find(c => c.id === id);
        if (!category) return false;

        const relatedPrompts = prompts.filter(p => p.categorySlug === category.slug);
        
        if (relatedPrompts.length > 0 && !force) {
          return false; // Block delete
        }

        if (force && relatedPrompts.length > 0) {
          // Detach prompts from category
          set(state => ({
            prompts: state.prompts.map(p =>
              p.categorySlug === category.slug
                ? { ...p, categorySlug: '', updatedAt: nowIso() }
                : p
            )
          }));
        }

        set(state => ({
          categories: state.categories.filter(c => c.id !== id)
        }));
        return true;
      },

      addPrompt: (promptData) => {
        const newPrompt: Prompt = {
          ...promptData,
          id: generateId(),
          version: 1,
          createdAt: nowIso(),
          updatedAt: nowIso(),
        };

        const { addPromptVersion } = get();
        
        set(state => ({
          prompts: [...state.prompts, newPrompt]
        }));

        // Add version history
        addPromptVersion({
          promptId: newPrompt.id,
          version: 1,
          content: newPrompt.content,
        });
      },

      updatePrompt: (id, updates) => {
        const { prompts, addPromptVersion } = get();
        const existingPrompt = prompts.find(p => p.id === id);
        if (!existingPrompt) return;

        const contentChanged = updates.content && updates.content !== existingPrompt.content;
        const newVersion = contentChanged ? existingPrompt.version + 1 : existingPrompt.version;

        const updatedPrompt = {
          ...existingPrompt,
          ...updates,
          version: newVersion,
          updatedAt: nowIso(),
        };

        set(state => ({
          prompts: state.prompts.map(p =>
            p.id === id ? updatedPrompt : p
          )
        }));

        // Add version history if content changed
        if (contentChanged) {
          addPromptVersion({
            promptId: id,
            version: newVersion,
            content: updates.content!,
          });
        }
      },

      duplicatePrompt: (id) => {
        const prompt = get().prompts.find(p => p.id === id);
        if (!prompt) return;

        const { addPrompt } = get();
        const duplicatedSlug = `${prompt.slug}-copy`;
        
        addPrompt({
          ...prompt,
          slug: duplicatedSlug,
          title: `${prompt.title} (Copy)`,
          isFeatured: false,
        });
      },

      archivePrompt: (id) => {
        const { updatePrompt } = get();
        updatePrompt(id, { status: 'ARCHIVED' });
      },

      addPromptVersion: (versionData) => {
        const newVersion: PromptVersion = {
          ...versionData,
          id: generateId(),
          createdAt: nowIso(),
        };
        set(state => ({
          promptVersions: [...state.promptVersions, newVersion]
        }));
      },

      applyValidRows: (rows, options) => {
        const { categories, prompts, addCategory, addPrompt, updatePrompt } = get();
        const categoriesCreated: string[] = [];

        rows.forEach(row => {
          if (row._action === 'INVALID') return;

          // Handle category creation
          if (options.autoCreateCategories) {
            const categoryExists = categories.some(c => c.slug === row.category_slug);
            if (!categoryExists && !categoriesCreated.includes(row.category_slug)) {
              addCategory({
                slug: row.category_slug,
                name: row.category_name,
                description: row.category_description || '',
                sortOrder: 0,
                isFeatured: false,
              });
              categoriesCreated.push(row.category_slug);
            }
          }

          // Parse row data
          const tags = row.tags ? row.tags.split(/[|,]/).map(t => t.trim()).filter(Boolean) : [];
          const isFeatured = row.is_featured?.toLowerCase() === 'true';
          const sortOrder = parseInt(row.sort_order || '0') || 0;
          const version = parseInt(row.version || '1') || 1;

          const promptData = {
            slug: row.slug,
            categorySlug: row.category_slug,
            title: row.title,
            shortDescription: row.short_description || '',
            content: row.content,
            status: row.status,
            visibility: row.visibility,
            tags,
            isFeatured,
            sortOrder,
          };

          if (row._action === 'INSERT') {
            addPrompt(promptData);
          } else if (row._action === 'UPDATE') {
            const existingPrompt = prompts.find(p => p.slug === row.slug);
            if (existingPrompt) {
              const updates: Partial<Prompt> = { ...promptData };
              
              // Handle "treat empty as no-change" option
              if (options.treatEmptyAsNoChange) {
                Object.keys(updates).forEach(key => {
                  const value = updates[key as keyof Prompt];
                  if (value === '' || value === undefined) {
                    delete updates[key as keyof Prompt];
                  }
                });
              }
              
              updatePrompt(existingPrompt.id, updates);
            }
          }
        });
      },
    }),
    {
      name: 'bwpm:v1',
      version: 1,
    }
  )
);