'use client';

import { Grid3X3, Table2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ViewToggle = () => {
  const { replace } = useRouter();
  const t = useTranslations('Index');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleViewChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ToggleGroup
      type="single"
      defaultValue={searchParams.get('view')?.toString() ?? 'grid'}
      onValueChange={(value) => handleViewChange(value)}
      className="mb-4"
    >
      <ToggleGroupItem value="grid" aria-label="Toggle grid view">
        <Grid3X3 className="h-4 w-4 mr-1" />
        {t('toggleView.grid')}
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Toggle table view">
        <Table2 className="h-4 w-4 mr-1" />
        {t('toggleView.table')}
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;
