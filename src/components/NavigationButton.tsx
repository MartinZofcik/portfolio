'use client';

import { Link } from '@/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const NavigationButton = ({
  href,
  className,
  titleTranslationKey,
  Icon,
}: {
  href: string;
  className?: string;
  titleTranslationKey: string;
  Icon?: React.ReactNode;
}) => {
  const t = useTranslations('Index');
  return (
    <Button asChild className={className}>
      <Link href={href}>
        {Icon}
        {t(titleTranslationKey)}
      </Link>
    </Button>
  );
};

export default NavigationButton;
