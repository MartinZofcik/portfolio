'use server';

import { createPlantSchema, PlantSchema } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { revalidatePath } from 'next/cache';
import { getErrorMessage } from '@/server/utils';
import prisma from '@/server/db';

export async function createPlantAction(values: PlantSchema) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      status: 'unauthorized',
    };
  }

  const result = createPlantSchema.safeParse(values);
  if (!result.success) {
    return {
      status: 'error',
      message: result.error.toString(),
    };
  }

  try {
    await prisma.plant.create({
      data: {
        ...result.data,
        ownerId: session.user.id,
      },
    });
    revalidatePath('/list');
    return {
      status: 'success',
      messageId: 'form.status.success.description',
    };
  } catch (err) {
    return {
      status: 'error',
      message: getErrorMessage(err),
    };
  }
}
