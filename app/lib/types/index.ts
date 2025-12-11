// Framework types
export type Framework = 'react' | 'vue' | 'svelte';

// API Request/Response types
export interface GenerateRequest {
  prompt: string;
  framework: Framework;
}

export interface GenerateResponse {
  success: boolean;
  code?: string;
  error?: string;
}

export interface RefineRequest {
  currentCode: string;
  refinement: string;
  conversationHistory: ConversationMessage[];
}

export interface RefineResponse {
  success: boolean;
  code?: string;
  error?: string;
}

// Conversation types
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Component Props types
export interface CodeDisplayProps {
  code: string;
}

export interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export interface PreviewPanelProps {
  code: string;
}

export interface FrameworkSelectorProps {
  selected: Framework;
  onSelect: (framework: Framework) => void;
  disabled?: boolean;
}

// Hook return types
export interface UseGeneratorReturn {
  code: string;
  isLoading: boolean;
  error: string | null;
  framework: Framework;
  conversationHistory: ConversationMessage[];
  generate: (prompt: string) => Promise<void>;
  refine: (refinement: string) => Promise<void>;
  reset: () => void;
  setFramework: (framework: Framework) => void;
}
