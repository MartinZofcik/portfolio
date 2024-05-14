'use client';

import { z } from 'zod';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { createPlantAction, editPlantAction } from '@/db/actions/plant';
import PlantForm from '@/app/[locale]/plant/components/PlantForm';
import { Plant } from '@prisma/client';

type IEditPlantFormProps = {
  plantId: string;
  plant: Plant;
};

const EditPlantForm: React.FC<IEditPlantFormProps> = ({ plantId, plant }) => {
  async function onSubmit(values: z.infer<typeof createPlantSchema>) {
    await editPlantAction(plantId, values);
  }

  return <PlantForm plant={plant} onSubmit={onSubmit} />;
};

export default EditPlantForm;
