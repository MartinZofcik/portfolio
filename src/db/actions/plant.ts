'use server';

import prisma from '@/db/db';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { z } from 'zod';
import { redirect } from '@/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getPlantsByOwner() {
  const session = await getServerSession(authOptions);

  if (session) {
    return prisma.plant.findMany({
      where: {
        ownerId: session.user.id,
      },
    });
  } else return [];
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
  const session = await getServerSession(authOptions);
  const result = createPlantSchema.safeParse(values);

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { data } = result;

  await prisma.plant.create({
    data: {
      ...data,
      ownerId: session.user.id,
    },
  });

  revalidatePath('/list');
  redirect('/list');
}
