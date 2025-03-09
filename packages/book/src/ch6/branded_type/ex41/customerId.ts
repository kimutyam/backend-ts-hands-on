import { z } from 'zod';

export const customerIdSchema = z.string().brand<'CustomerId'>();
