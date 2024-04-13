import PlantsView from '@/app/[locale]/list/components/PlantsView';
import { getAllPlants } from '@/db/actions';
import { unstable_noStore } from 'next/cache';

export default async function PlantsListPage() {
  unstable_noStore();
  // const t = await getTranslations('Index');
  const plants = await getAllPlants();

  return (
    <div className="flex flex-col items-center justify-between px-24 py-4">
      <PlantsView plants={plants} />
    </div>
  );
}
