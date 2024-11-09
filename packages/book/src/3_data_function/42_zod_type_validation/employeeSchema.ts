import { z } from 'zod';

const nameSchema = z.string();

const employeeSchema = z.object({
  name: nameSchema,
  age: z.number(),
});

// type Employee = {name: string; age: number};
type Employee = z.infer<typeof employeeSchema>;

export { type Employee, employeeSchema };
