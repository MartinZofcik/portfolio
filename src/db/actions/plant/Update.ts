'use server';

import { createPlantSchema, PlantSchema } from '@/lib/types';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';
import { getErrorMessage } from '@/app/api/utils';

export async function editPlantAction(plantId: string, values: PlantSchema) {
  const result = createPlantSchema.safeParse(values);
  if (!result.success) {
    return {
      status: 'error',
      message: result.error.toString(),
    };
  }

  try {
    await prisma.plant.update({
      where: {
        id: plantId,
      },
      data: {
        ...result.data,
      },
    });
    revalidatePath(`/list`);
    return {
      status: 'success',
      messageId: 'form.status.success.description',
    };
  } catch (err: any) {
    return {
      status: 'error',
      message: getErrorMessage(err),
    };
  }
}

export async function editIsFavorite(
  plantId: string,
  isCurrentlyFavorite: boolean,
) {
  try {
    await prisma.plant.update({
      where: {
        id: plantId,
      },
      data: {
        is_favorite: !isCurrentlyFavorite,
      },
    });
    revalidatePath('/list');
    return {
      status: 'success',
      messageId: isCurrentlyFavorite
        ? 'isPlantFavorite.removedFromFavorites'
        : 'isPlantFavorite.addedToFavorites',
    };
  } catch (err: any) {
    return {
      status: 'error',
      message: getErrorMessage(err),
    };
  }
}
