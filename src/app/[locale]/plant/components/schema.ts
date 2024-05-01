import { z } from 'zod';

export const createPlantSchema = z.object({
  latin_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  slovak_name: z.string(),
  // size: z.string().min(2, {
  //   message: 'Size must not be empty.',
  // }),
});
