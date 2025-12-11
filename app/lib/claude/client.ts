import Anthropic from '@anthropic-ai/sdk';
import { API_CONFIG } from '@/app/constants/api';
import { logger } from '../utils/logger';
import { Framework } from '../types';
import { generatePrompt, refinePrompt } from './prompts';

class ClaudeClient {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
    }

    this.client = new Anthropic({
      apiKey,
      timeout: API_CONFIG.REQUEST_TIMEOUT,
    });
  }

  async generateCode(prompt: string, framework: Framework): Promise<string> {
    try {
      logger.info('Generating code', { prompt, framework });

      const systemPrompt = generatePrompt(prompt, framework);

      const message = await this.client.messages.create({
        model: API_CONFIG.ANTHROPIC_MODEL,
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: API_CONFIG.TEMPERATURE,
        messages: [
          {
            role: 'user',
            content: systemPrompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude API');
      }

      const code = this.extractCode(content.text);

      if (!code || code.trim().length === 0) {
        throw new Error('Generated code is empty');
      }

      logger.info('Code generated successfully', { codeLength: code.length });
      return code;
    } catch (error) {
      logger.error('Failed to generate code', error);

      if (error instanceof Error) {
        throw new Error(`Code generation failed: ${error.message}`);
      }
      throw new Error('Unknown error occurred during code generation');
    }
  }

  async refineCode(
    currentCode: string,
    refinement: string,
    conversationHistory: Array<{ role: string; content: string }>
  ): Promise<string> {
    try {
      logger.info('Refining code', { refinement });

      const historyText = conversationHistory
        .slice(-6) // 최근 6개만 (토큰 절약)
        .map((msg) => `${msg.role}: ${msg.content.substring(0, 100)}...`)
        .join('\n');

      const systemPrompt = refinePrompt(currentCode, refinement, historyText);

      const message = await this.client.messages.create({
        model: API_CONFIG.ANTHROPIC_MODEL,
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: API_CONFIG.TEMPERATURE,
        messages: [
          {
            role: 'user',
            content: systemPrompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude API');
      }

      const code = this.extractCode(content.text);

      if (!code || code.trim().length === 0) {
        throw new Error('Refined code is empty');
      }

      logger.info('Code refined successfully', { codeLength: code.length });
      return code;
    } catch (error) {
      logger.error('Failed to refine code', error);

      if (error instanceof Error) {
        throw new Error(`Code refinement failed: ${error.message}`);
      }
      throw new Error('Unknown error occurred during code refinement');
    }
  }

  private extractCode(text: string): string {
    // 여러 코드 블록 패턴 시도
    const patterns = [
      /```(?:html|javascript|jsx|typescript|tsx)?\n?([\s\S]*?)```/,
      /```\n?([\s\S]*?)```/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // 코드 블록이 없으면 전체 텍스트 반환
    return text.trim();
  }
}

export const claudeClient = new ClaudeClient();
