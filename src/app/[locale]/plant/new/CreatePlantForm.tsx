'use client';

import { z } from 'zod';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { createPlantAction } from '@/db/actions/plant';
import PlantForm from '@/app/[locale]/plant/components/PlantForm';

const CreatePlantForm = () => {
  async function onSubmit(values: z.infer<typeof createPlantSchema>) {
    await createPlantAction(values);
  }

  return <PlantForm onSubmit={onSubmit} />;
};

export default CreatePlantForm;
