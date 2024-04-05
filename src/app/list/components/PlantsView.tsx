'use client';

import { Plant } from '@/db/schema';
import PlantCard from '@/app/list/components/PlantCard';
import { getPlants } from '@/db/actions';

export default async function PlantsView() {
  const plants = await getPlants();

  return (
    <div className="grid grid-cols-4 gap-8">
      {plants &&
        []
          .concat(...Array(10).fill(plants))
          .map((plant: Plant, index) => (
            <PlantCard key={index} plant={plant} />
          ))}
    </div>
  );
}
