import { z } from 'zod';

export const nameSchema = z.string().brand('Name');
export type Name = z.infer<typeof nameSchema>; // string & z.BRAND<"name">
