import { z } from 'zod';

export const schema = z.number().int().min(1);

export type SlatChange = z.infer<typeof schema>;
