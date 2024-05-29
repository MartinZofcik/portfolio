'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/db/db';
import { getErrorMessage } from '@/app/api/utils';

export async function getPlantsByOwner() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      status: 'unauthorized',
    };
  }
  try {
    const plants = await prisma.plant.findMany({
      where: {
        ownerId: session.user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return {
      status: 'success',
      plants: plants,
    };
  } catch (err) {
    return {
      status: 'error',
      message: getErrorMessage(err),
    };
  }
}

export async function getPlantById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      status: 'unauthorized',
    };
  }
  try {
    const plant = prisma.plant.findFirst({
      where: {
        id: id,
      },
    });
    return {
      status: 'success',
      plant: plant,
    };
  } catch (err) {
    return {
      status: 'error',
      message: getErrorMessage(err),
    };
  }
}
