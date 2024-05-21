'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/db/db';

export async function getPlantsByOwner() {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   return {
  //     status: 'unauthorized',
  //   };
  // }
  return prisma.plant.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
}

export async function getPlantById(id: string) {
  return prisma.plant.findFirst({
    where: {
      id: id,
    },
  });
}
