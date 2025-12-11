'use client';

import { PromptInput } from './features/generator/components/PromptInput';
import { CodeDisplay } from './features/generator/components/CodeDisplay';
import { PreviewPanel } from './features/generator/components/PreviewPanel';
import { FrameworkSelector } from './features/generator/components/FrameworkSelector';
import { useGenerator } from './features/generator/hooks/useGenerator';

export default function HomePage() {
  const {
    code,
    isLoading,
    error,
    framework,
    conversationHistory,
    generate,
    refine,
    reset,
    setFramework,
  } = useGenerator();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 헤더 */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            🎨 Chatvas
          </h1>
          <p className="text-xl text-gray-600">
            AI가 당신의 아이디어를 코드로 변환합니다
          </p>
        </header>

        {/* 프레임워크 선택 */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🛠️ 프레임워크 선택
            </label>
            <FrameworkSelector
              selected={framework}
              onSelect={setFramework}
              disabled={isLoading}
            />
          </div>
        </section>

        {/* 입력 */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {code ? '💬 수정 요청' : '💡 무엇을 만들까요?'}
            </h2>
            <PromptInput
              onSubmit={code ? refine : generate}
              isLoading={isLoading}
              placeholder={
                code
                  ? '예: 버튼을 더 크게, 배경색을 하늘색으로 변경'
                  : '예: 로그인 페이지 만들어줘, 파란색 그라데이션 테마로'
              }
            />
          </div>
        </section>

        {/* 에러 표시 */}
        {error && (
          <section className="mb-8">
            <div className="p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl shadow-sm">
              <div className="flex items-start">
                <span className="text-2xl mr-3">❌</span>
                <div>
                  <h3 className="font-semibold mb-1">오류 발생</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 결과 */}
        {code && (
          <>
            <section className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CodeDisplay code={code} />
                <PreviewPanel code={code} />
              </div>
            </section>

            {/* 대화 히스토리 */}
            {conversationHistory.length > 2 && (
              <section className="mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4">📜 대화 기록</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {conversationHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-blue-50 border-l-4 border-blue-500'
                            : 'bg-gray-50 border-l-4 border-gray-400'
                        }`}
                      >
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          {msg.role === 'user' ? '👤 You' : '🤖 AI'}
                        </p>
                        <p className="text-sm text-gray-800 line-clamp-2">
                          {msg.content.substring(0, 150)}
                          {msg.content.length > 150 && '...'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 액션 버튼 */}
            <section className="flex justify-center">
              <button
                onClick={reset}
                className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                🔄 새로 시작
              </button>
            </section>
          </>
        )}

        {/* 푸터 */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Claude AI • Open Source Project</p>
        </footer>
      </div>
    </main>
  );
}
