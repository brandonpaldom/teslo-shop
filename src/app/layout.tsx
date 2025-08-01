import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components';
import { inter } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'The Official Teslo Shop | Teslo',
  description:
    'Explore Teslo apparel and lifestyle collections for everyone. Shop the official Teslo store for Teslo lifestyle products and apparel for men, women and kids. Fast free shipping on most purchases.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-neutral-900 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
