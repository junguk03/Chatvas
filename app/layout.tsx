import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chatvas - AI Design to Code',
  description: 'AI-powered conversational design tool - Design through conversation',
  keywords: ['ai', 'design-to-code', 'claude', 'conversational-ui', 'design-tool'],
  authors: [{ name: 'junguk03' }],
  openGraph: {
    title: 'Chatvas - AI Design to Code',
    description: 'AI-powered conversational design tool',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
