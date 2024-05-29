'use client';

import React from 'react';
import { Plant } from '@prisma/client';
import PlantCard from '@/app/[locale]/list/components/PlantCard';
import ViewToggle from '@/components/ViewToggle';
import { useSearchParams } from 'next/navigation';
import PlantsDataTable from '@/app/[locale]/list/components/PlantsDataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ModalContext } from '@/app/context/modal-provider';
import CreatePlantForm from '@/components/form/CreatePlantForm';

interface IPlantProps {
  plants: Plant[];
}

const PlantsView: React.FC<IPlantProps> = ({ plants }) => {
  const t = useTranslations('Index');
  const { toggleModal } = React.useContext(ModalContext);
  const searchParams = useSearchParams();

  const gridView =
    !searchParams.get('view')?.toString() ||
    searchParams.get('view')?.toString() === 'grid';

  const handleCreatePlant = () => {
    toggleModal({
      isOpen: true,
      title: (
        <div className="flex flex-row items-center">
          <Plus color="#22ac20" className="mr-1" height={24} width={24} />
          {t('plantForm.create')}
        </div>
      ),
      content: <CreatePlantForm />,
    });
  };

  return (
    <div className="container">
      <div className="flex justify-end">
        <Button className="mr-10" onClick={handleCreatePlant}>
          <Plus width={16} height={16} />
          {t('addPlantButton')}
        </Button>
        <ViewToggle />
      </div>
      {gridView ? (
        <div className="grid grid-cols-4 gap-5">
          {/*{[].concat(...Array(10).fill(plants)).map((plant: Plant, index) => (*/}
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
