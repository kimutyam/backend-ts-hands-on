import { z } from 'zod';

const nameSchema = z.string().min(1).max(10);

const employeeSchema = z.object({
  name: nameSchema,
  age: z.number().min(10).max(60).int(),
});

export { employeeSchema };
