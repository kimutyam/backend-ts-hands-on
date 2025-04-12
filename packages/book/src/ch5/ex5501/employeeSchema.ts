import { z } from 'zod';

const nameSchema = z
  .string({
    // 1
    invalid_type_error: '文字列で指定してください',
    // 2
    required_error: '名前は必須です',
  })
  .min(1, '1文字以上で指定ください')
  .max(10, '10文字以内で指定ください');

const employeeSchema = z.object({
  name: nameSchema,
  age: z
    .number({
      invalid_type_error: '数値で指定してください',
      required_error: '年齢は必須です',
    })
    // 3
    .min(10, '10以上で指定してください')
    .max(60, '60以下で指定してください')
    .int('整数で指定してください'),
});

export { employeeSchema };
