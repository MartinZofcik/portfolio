import PlantsView from '@/app/[locale]/list/components/PlantsView';
import { getPlantsByOwner } from '@/db/actions/plant';
import PageWrapper from '@/components/PageWrapper';
import { unstable_noStore } from 'next/cache';

export default async function PlantsListPage() {
  unstable_noStore();
  const plants = await getPlantsByOwner();

  return (
    <PageWrapper>
      <PlantsView plants={plants} />
    </PageWrapper>
  );
}
