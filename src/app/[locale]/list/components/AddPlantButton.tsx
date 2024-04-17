'use client';

import { Link } from '@/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddPlantButton = ({ className }: { className: string }) => {
  const t = useTranslations('Index');
  return (
    <Button asChild className={className}>
      <Link href="/plant/new">
        <Plus width={16} height={16} />
        {t('addPlantButton')}
      </Link>
    </Button>
  );
};

export default AddPlantButton;
