import { z } from 'zod';

const nameSchema = z.string(); // 1

// 2
const employeeSchema = z.object({
  name: nameSchema, // 3
  age: z.number(),
});

// type Employee = {name: string; age: number};
type Employee = z.infer<typeof employeeSchema>;

export { type Employee, employeeSchema };
