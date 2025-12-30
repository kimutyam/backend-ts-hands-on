import { z } from 'zod';

// 1
const nameSchema = z.string().min(1).max(10);

const employeeSchema = z.object({
  name: nameSchema,
  // 2
  age: z.number().min(10).max(60).int(),
});

export { employeeSchema };
