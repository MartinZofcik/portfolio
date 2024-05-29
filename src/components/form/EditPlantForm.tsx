'use client';

import PlantForm from '@/components/form/PlantForm';
import { Plant } from '@prisma/client';
import { PlantSchema } from '@/lib/types';
import React from 'react';
import { ModalContext } from '@/app/context/modal-provider';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import { handleActionResponse } from '@/app/api/utils';
import { editPlantAction } from '@/db/actions/plant/Update';

type IEditPlantFormProps = {
  plant: Plant;
};

const EditPlantForm: React.FC<IEditPlantFormProps> = ({ plant }) => {
  const t = useTranslations('Index');
  const { toast } = useToast();
  const { toggleModal } = React.useContext(ModalContext);

  async function onSubmit(values: PlantSchema) {
    const response = await editPlantAction(plant.id, values);
    handleActionResponse(response, t, toast, toggleModal);
  }

  return <PlantForm plant={plant} onSubmit={onSubmit} />;
};

export default EditPlantForm;
