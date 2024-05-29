import PlantsView from '@/app/[locale]/list/components/PlantsView';
import PageWrapper from '@/components/PageWrapper';
import { unstable_noStore } from 'next/cache';
import { getPlantsByOwner } from '@/db/actions/plant/Read';

export default async function PlantsListPage() {
  unstable_noStore();
  const response = await getPlantsByOwner();

  return (
    <PageWrapper>
      {response?.plants && <PlantsView plants={response?.plants} />}
    </PageWrapper>
  );
}
