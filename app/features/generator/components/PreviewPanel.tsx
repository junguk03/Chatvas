'use client';

import { useEffect, useRef, useState } from 'react';

interface PreviewPanelProps {
  code: string;
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (iframeRef.current && code) {
      try {
        setError(null);
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!doc) {
          setError('미리보기를 로드할 수 없습니다.');
          return;
        }

        doc.open();
        doc.write(code);
        doc.close();
      } catch (err) {
        setError('코드 렌더링 중 오류가 발생했습니다.');
        console.error('Preview error:', err);
      }
    }
  }, [code]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">🎨 미리보기</h3>
        <p className="text-sm text-gray-500">실시간 렌더링</p>
      </div>

      {error && (
        <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <iframe
          ref={iframeRef}
          className="w-full h-[600px]"
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
