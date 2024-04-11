import prisma from '@/db/db';
import { unstable_noStore } from 'next/cache';

export async function getAllPlants() {
  unstable_noStore();
  return prisma.plant.findMany();
}

export async function getPlantById(id: string) {
  unstable_noStore();
  return prisma.plant.findFirst({
    where: {
      id: id,
    },
  });
}
