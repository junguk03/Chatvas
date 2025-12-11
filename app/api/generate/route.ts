import { NextRequest, NextResponse } from 'next/server';
import { claudeClient } from '@/app/lib/claude/client';
import { logger } from '@/app/lib/utils/logger';
import { GenerateRequest, GenerateResponse, Framework } from '@/app/lib/types';

const VALID_FRAMEWORKS: Framework[] = ['react', 'vue', 'svelte'];

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt, framework } = body;

    // 입력 검증
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '유효한 프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (prompt.length > 5000) {
      return NextResponse.json(
        { success: false, error: '프롬프트가 너무 깁니다 (최대 5000자).' },
        { status: 400 }
      );
    }

    if (!framework || !VALID_FRAMEWORKS.includes(framework)) {
      return NextResponse.json(
        { success: false, error: '지원하지 않는 프레임워크입니다.' },
        { status: 400 }
      );
    }

    logger.info('Generating code via API', {
      promptLength: prompt.length,
      framework,
    });

    const code = await claudeClient.generateCode(prompt, framework);

    const response: GenerateResponse = {
      success: true,
      code,
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Error in generate API', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : '코드 생성 중 오류가 발생했습니다.';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
