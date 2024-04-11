'use client';

import React from 'react';
import { Plant } from '@prisma/client';
import PlantCard from '@/app/list/components/PlantCard';
import ListTableToggle from '@/app/list/components/ListTableToggle';
import { useSearchParams } from 'next/navigation';
import PlantsDataTable from '@/app/list/components/PlantsDataTable';

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
        <ListTableToggle />
      </div>
      {gridView ? (
        <div className="grid grid-cols-4 gap-6">
          {[].concat(...Array(10).fill(plants)).map((plant: Plant, index) => (
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
