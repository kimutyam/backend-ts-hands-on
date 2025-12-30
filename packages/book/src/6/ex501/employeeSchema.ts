import { z } from 'zod';

const nameSchema = z
  .string('名前は文字列で指定してください')
  .min(1, '1文字以上で指定してください')
  .max(10, `名前は10文字以内で指定してください`);

const employeeSchema = z.object({
  name: nameSchema,
  age: z
    .number('年齢は数値で指定してください')
    .min(10, `年齢は10以上で指定してください`)
    .max(60, `年齢は60以下で指定してください`)
    .int('年齢は整数で指定してください'),
});

export { employeeSchema };
