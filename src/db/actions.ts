import { db } from '@/db/index';

export async function getPlants() {
  return db.query.plant.findMany();
}
