'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/ThemeProvider';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ModalProvider } from '@/app/context/modal-provider';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
