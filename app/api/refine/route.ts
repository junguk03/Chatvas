import { NextRequest, NextResponse } from 'next/server';
import { claudeClient } from '@/app/lib/claude/client';
import { logger } from '@/app/lib/utils/logger';
import { RefineRequest } from '@/app/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: RefineRequest = await request.json();
    const { currentCode, refinement, conversationHistory } = body;

    // 입력 검증
    if (!currentCode || typeof currentCode !== 'string') {
      return NextResponse.json(
        { success: false, error: '현재 코드가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!refinement || typeof refinement !== 'string' || refinement.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '수정 요청을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (refinement.length > 2000) {
      return NextResponse.json(
        { success: false, error: '수정 요청이 너무 깁니다 (최대 2000자).' },
        { status: 400 }
      );
    }

    if (!Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { success: false, error: '대화 히스토리 형식이 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    logger.info('Refining code via API', {
      refinementLength: refinement.length,
      historyLength: conversationHistory.length,
    });

    const code = await claudeClient.refineCode(
      currentCode,
      refinement,
      conversationHistory
    );

    return NextResponse.json({
      success: true,
      code,
    });
  } catch (error) {
    logger.error('Error in refine API', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : '코드 수정 중 오류가 발생했습니다.';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
