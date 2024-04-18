'use client';

import React from 'react';
import { Plant } from '@prisma/client';
import PlantCard from '@/app/[locale]/list/components/PlantCard';
import ViewToggle from '@/app/[locale]/list/components/ViewToggle';
import { useSearchParams } from 'next/navigation';
import PlantsDataTable from '@/app/[locale]/list/components/PlantsDataTable';
import NavigationButton from '@/components/NavigationButton';
import { Plus } from 'lucide-react';

interface IPlantProps {
  plants: Plant[];
}

const PlantsView: React.FC<IPlantProps> = ({ plants }) => {
  const searchParams = useSearchParams();

  const gridView =
    !searchParams.get('view')?.toString() ||
    searchParams.get('view')?.toString() === 'grid';

  return (
    <div className="container">
      <div className="flex justify-end">
        <NavigationButton
          href="/plant/new"
          className="mr-10"
          titleTranslationKey="addPlantButton"
          Icon={<Plus width={16} height={16} />}
        />
        <ViewToggle />
      </div>
      {gridView ? (
        <div className="grid grid-cols-4 gap-6">
          {plants.map((plant: Plant, index) => (
            <PlantCard key={index} plant={plant} />
          ))}
        </div>
      ) : (
        <PlantsDataTable plants={plants} />
      )}
    </div>
  );
};

export default PlantsView;
