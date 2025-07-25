import { vi } from 'vitest'

// Mock nanoid for consistent test IDs
vi.mock('nanoid', () => ({
  nanoid: () => 'test-id-123'
}))

// Mock fetch for API tests
global.fetch = vi.fn()

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve())
  }
})

// Mock file reader
global.FileReader = class MockFileReader {
  result: string | null = null
  onload: ((event: any) => void) | null = null
  
  readAsText(file: File) {
    setTimeout(() => {
      this.result = `Mocked content for ${file.name}`
      if (this.onload) {
        this.onload({ target: this } as any)
      }
    }, 0)
  }
} as any