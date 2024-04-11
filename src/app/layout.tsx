import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/app/Header';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Naše kvetinky',
  description: 'App for our plants',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <NextTopLoader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
