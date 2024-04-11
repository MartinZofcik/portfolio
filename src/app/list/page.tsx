import PlantsView from '@/app/list/components/PlantsView';
import { getAllPlants } from '@/db/actions';
import { unstable_noStore } from 'next/cache';

export default async function PlantsListPage() {
  unstable_noStore();
  const plants = await getAllPlants();
  // const plant = await getPlantById('6bc89092-7395-4f74-9054-072f548d20cd');

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-4">
      <PlantsView plants={plants} />
    </div>
  );
}
