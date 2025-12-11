export const API_CONFIG = {
  ANTHROPIC_MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
  REQUEST_TIMEOUT: 30000, // 30초
} as const;

export const API_ENDPOINTS = {
  GENERATE: '/api/generate',
  REFINE: '/api/refine',
} as const;
