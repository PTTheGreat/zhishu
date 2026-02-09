import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '值数 — 全网内容洞察平台',
  description:
    '覆盖 30+ 内容平台，通过 AI 实时分析全网数据，帮助品牌发现趋势、评估达人、监测声量。',
  keywords: ['内容洞察', 'KOL分析', '品牌监测', '社交聆听', '营销数据', '值数'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 思源宋体 (Source Han Serif) via Google Fonts CDN (Noto Serif SC) + Crimson Pro */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
