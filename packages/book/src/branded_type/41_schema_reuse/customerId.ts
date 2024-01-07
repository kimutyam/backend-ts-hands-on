import { z } from 'zod';

declare const CustomerIdBrand: unique symbol;
export const customerIdSchema = z.string().brand<typeof CustomerIdBrand>();
