import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VidSpark· 一键创意 · 智能混剪 · 多平台同步',
  description: 'VidSpark· 一键创意 · 智能混剪 · 多平台同步',
  metadataBase: new URL('http://localhost:3000/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
