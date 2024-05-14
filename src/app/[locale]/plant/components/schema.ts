import { z } from 'zod';
import { Size } from '@prisma/client';

export const createPlantSchema = z.object({
  latin_name: z.string().min(2, {
    message: 'Latin name must be at least 2 characters.',
  }),
  slovak_name: z.string(),
  size: z.nativeEnum(Size),
  description: z.string(),
  recommended_place: z.string(),
});
