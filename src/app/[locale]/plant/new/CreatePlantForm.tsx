'use client';

import PlantForm from '@/app/[locale]/plant/components/PlantForm';
import { PlantSchema } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { ModalContext } from '@/app/context/modal-provider';
import { handleActionResponse } from '@/app/api/utils';
import { createPlantAction } from '@/db/actions/plant/Create';

const CreatePlantForm = () => {
  const t = useTranslations('Index');
  const { toast } = useToast();
  const { toggleModal } = React.useContext(ModalContext);
  async function onSubmit(values: PlantSchema) {
    const response = await createPlantAction(values);
    handleActionResponse(response, t, toggleModal, toast);
  }

  return <PlantForm onSubmit={onSubmit} />;
};

export default CreatePlantForm;
