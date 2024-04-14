'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from 'next-intl';
// import { useTransition } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChangeLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`, {
        locale: nextLocale,
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          variant="outline"
          size="icon"
          className="mr-2"
        >
          {locale === 'sk' && <p className={'h-[1.2rem] w-[1.2rem]'}>SK</p>}
          {locale === 'en' && (
            <p className={'absolute h-[1.2rem] w-[1.2rem]'}>EN</p>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeLocale('sk')}>
          Slovak
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLocale('en')}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
