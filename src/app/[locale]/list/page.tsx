import PlantsView from '@/app/[locale]/list/components/PlantsView';
import { getPlantsOfCurrentUser } from '@/db/actions';
import { unstable_noStore } from 'next/cache';
import PageWrapper from '@/components/PageWrapper';

export default async function PlantsListPage() {
  unstable_noStore();
  const plants = await getPlantsOfCurrentUser();

  return (
    <PageWrapper>
      <PlantsView plants={plants} />
    </PageWrapper>
  );
}
