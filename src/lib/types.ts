import { z } from 'zod';
import { Size } from '@prisma/client';

export const createPlantSchema = z.object({
  id: z.string().optional(),
  latin_name: z.string().min(2, {
    message: 'Latin name must be at least 2 characters.',
  }),
  slovak_name: z.string(),
  size: z.nativeEnum(Size),
  description: z.string().max(400),
  recommended_place: z.string(),
});

export type PlantSchema = z.infer<typeof createPlantSchema>;
