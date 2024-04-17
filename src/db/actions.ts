'use server';

import prisma from '@/db/db';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { z } from 'zod';
import { redirect } from '@/navigation';

export async function getAllPlants() {
  return prisma.plant.findMany();
}

export async function getPlantById(id: string) {
  return prisma.plant.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createPlantAction(
  values: z.infer<typeof createPlantSchema>,
) {
  const result = createPlantSchema.safeParse(values);

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { data } = result;

  await prisma.plant.create({
    data,
  });

  revalidatePath('/list');
  redirect('/list');
}
