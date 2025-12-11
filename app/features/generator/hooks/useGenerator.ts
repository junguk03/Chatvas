'use client';

import { useState } from 'react';
import { Framework, ConversationMessage, UseGeneratorReturn } from '@/app/lib/types';
import { API_ENDPOINTS } from '@/app/constants/api';

export function useGenerator(): UseGeneratorReturn {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  const generate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          framework,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '코드 생성에 실패했습니다.');
      }

      setCode(data.code);
      setConversationHistory([
        { role: 'user', content: prompt },
        { role: 'assistant', content: data.code },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refine = async (refinement: string) => {
    if (!code) {
      setError('먼저 코드를 생성해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.REFINE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentCode: code,
          refinement,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '코드 수정에 실패했습니다.');
      }

      setCode(data.code);
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', content: refinement },
        { role: 'assistant', content: data.code },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setCode('');
    setError(null);
    setConversationHistory([]);
  };

  return {
    code,
    isLoading,
    error,
    framework,
    conversationHistory,
    generate,
    refine,
    reset,
    setFramework,
  };
}
