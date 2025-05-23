import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskSelector from './TaskSelector';
import { TaskType } from './TaskIcons'; // Assuming TaskType is exported here

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <svg data-testid="search-icon" />,
  FileText: () => <svg data-testid="filetext-icon" />,
  // Add any other icons TaskIcon might use if TaskIcon itself isn't mocked deeply
  Edit3: () => <svg data-testid="edit3-icon" />, // For 'content' task
  Code: () => <svg data-testid="code-icon" />,   // For 'code' task
  Zap: () => <svg data-testid="zap-icon" />,    // For 'idea' task
  Image: () => <svg data-testid="image-icon" />,  // For 'image' task
  Mail: () => <svg data-testid="mail-icon" />,   // For 'email' task
  ClipboardList: () => <svg data-testid="clipboardlist-icon" />, // For 'research'
  BarChart3: () => <svg data-testid="barchart3-icon" />, // For 'data'
  Globe: () => <svg data-testid="globe-icon" />, // For 'seo'
  BookOpen: () => <svg data-testid="bookopen-icon" />, // For 'knowledge'
  MoreHorizontal: () => <svg data-testid="morehorizontal-icon" />, // For 'other'
}));

// Mock TaskIcon component (shallow mock)
jest.mock('./TaskIcons', () => ({
  __esModule: true,
  default: ({ type }) => <div data-testid={`task-icon-${type}`}>{type}</div>,
  // Ensure TaskType is still available if used directly in TaskSelector tests
  // If TaskType is only used by the original TaskIcon, this might not be needed
}));


// Mock SUBCATEGORIES from './subcategories'
jest.mock('./subcategories', () => ({
  SUBCATEGORIES: {
    content: [
      { id: 'blog-post', name: 'Blog Post', description: 'Write a blog post.' },
      { id: 'article', name: 'Article', description: 'Write an article.' },
    ],
    code: [
      { id: 'python-script', name: 'Python Script', description: 'Generate Python code.' },
    ],
    // Add other task types if their subcategories are tested
  },
}));


describe('TaskSelector Component', () => {
  const mockOnTaskSelect = jest.fn();
  const mockOnSubCategorySelect = jest.fn();
  const mockOnLoadCustomTemplate = jest.fn();

  const sampleCustomTemplates = [
    { name: 'My Blog Template', taskType: 'content', subCategory: 'blog-post', promptContent: 'Blog prompt' },
    { name: 'Python Helper', taskType: 'code', subCategory: 'python-script', promptContent: 'Python script prompt' },
  ];

  beforeEach(() => {
    mockOnTaskSelect.mockClear();
    mockOnSubCategorySelect.mockClear();
    mockOnLoadCustomTemplate.mockClear();
  });

  describe('Displaying Custom Templates', () => {
    it('should render the "Load from Your Custom Templates" section if templates are provided', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
          customTemplates={sampleCustomTemplates}
          onLoadCustomTemplate={mockOnLoadCustomTemplate}
        />
      );
      expect(screen.getByText('Load from Your Custom Templates')).toBeInTheDocument();
      expect(screen.getByText(sampleCustomTemplates[0].name)).toBeInTheDocument();
      expect(screen.getByText(sampleCustomTemplates[1].name)).toBeInTheDocument();
      
      // Check for task type and subcategory rendering (based on current implementation)
      expect(screen.getByText(/content - blog post/i)).toBeInTheDocument();
      expect(screen.getByText(/code - python script/i)).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');
      // Filter for buttons that are likely custom template buttons
      const templateButtons = buttons.filter(btn => 
        sampleCustomTemplates.some(t => btn.textContent.includes(t.name))
      );
      expect(templateButtons.length).toBe(sampleCustomTemplates.length);
    });

    it('should adjust the main task selection title when custom templates are present', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
          customTemplates={sampleCustomTemplates}
          onLoadCustomTemplate={mockOnLoadCustomTemplate}
        />
      );
      expect(screen.getByText('Or, select a task type to get started:')).toBeInTheDocument();
    });
  });

  describe('Selecting a Custom Template', () => {
    it('should call onLoadCustomTemplate with the correct template when a template button is clicked', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
          customTemplates={sampleCustomTemplates}
          onLoadCustomTemplate={mockOnLoadCustomTemplate}
        />
      );

      const firstTemplateButton = screen.getByText(sampleCustomTemplates[0].name);
      fireEvent.click(firstTemplateButton);

      expect(mockOnLoadCustomTemplate).toHaveBeenCalledTimes(1);
      expect(mockOnLoadCustomTemplate).toHaveBeenCalledWith(sampleCustomTemplates[0]);
    });
  });

  describe('No Custom Templates', () => {
    it('should not render the "Load from Your Custom Templates" section if no templates are provided', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
          customTemplates={[]}
          onLoadCustomTemplate={mockOnLoadCustomTemplate}
        />
      );
      expect(screen.queryByText('Load from Your Custom Templates')).not.toBeInTheDocument();
    });
    
    it('should not render the "Load from Your Custom Templates" section if customTemplates prop is undefined', () => {
        render(
          <TaskSelector
            selectedTask={null}
            selectedSubCategory={null}
            onTaskSelect={mockOnTaskSelect}
            onSubCategorySelect={mockOnSubCategorySelect}
            // customTemplates prop omitted (undefined)
            onLoadCustomTemplate={mockOnLoadCustomTemplate}
          />
        );
        expect(screen.queryByText('Load from Your Custom Templates')).not.toBeInTheDocument();
      });

    it('should use the default main task selection title when no custom templates are present', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
          customTemplates={[]}
          onLoadCustomTemplate={mockOnLoadCustomTemplate}
        />
      );
      expect(screen.getByText('I want AI to:')).toBeInTheDocument();
    });
  });

  describe('Existing Task and SubCategory Selection', () => {
    it('should correctly select a main task', () => {
      render(
        <TaskSelector
          selectedTask={null}
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
        />
      );
      // TASK_OPTIONS are used to create these. "Write Content" is the name for 'content' task.
      const contentTaskCard = screen.getByText('Write Content').closest('div[class*="Card"]'); // Find the card
      expect(contentTaskCard).toBeInTheDocument();
      fireEvent.click(contentTaskCard);
      expect(mockOnTaskSelect).toHaveBeenCalledWith('content');
    });

    it('should display and allow selection of subcategories when a main task is selected', () => {
      render(
        <TaskSelector
          selectedTask={'content' as TaskType} // Pre-select a task
          selectedSubCategory={null}
          onTaskSelect={mockOnTaskSelect}
          onSubCategorySelect={mockOnSubCategorySelect}
        />
      );
      // Subcategories for 'content' are 'Blog Post' and 'Article' from the mock
      expect(screen.getByText('Select Specific Type:')).toBeInTheDocument();
      const blogPostRadioLabel = screen.getByLabelText('Blog Post');
      expect(blogPostRadioLabel).toBeInTheDocument();
      fireEvent.click(blogPostRadioLabel); // Click the label associated with the radio item
      expect(mockOnSubCategorySelect).toHaveBeenCalledWith('blog-post');
    });

    it('should filter subcategories based on search query', () => {
        render(
          <TaskSelector
            selectedTask={'content' as TaskType}
            selectedSubCategory={null}
            onTaskSelect={mockOnTaskSelect}
            onSubCategorySelect={mockOnSubCategorySelect}
          />
        );
        expect(screen.getByLabelText('Blog Post')).toBeInTheDocument();
        expect(screen.getByLabelText('Article')).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText('Search types...');
        fireEvent.change(searchInput, { target: { value: 'Blog' } });

        expect(screen.getByLabelText('Blog Post')).toBeInTheDocument();
        expect(screen.queryByLabelText('Article')).not.toBeInTheDocument();
      });
  });
});
