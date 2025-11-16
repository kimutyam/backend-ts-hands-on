import { z } from 'zod';

const nameSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? '名前は必須です'
        : '名前は文字列で指定してください',
  })
  .min(1, {
    error: (issue) => `名前は${issue.minimum.toString()}文字以上で指定ください`,
  })
  .max(10, {
    error: (issue) => `名前は${issue.maximum.toString()}文字以内で指定ください`,
  });

const employeeSchema = z.object({
  name: nameSchema,
  age: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? '年齢は必須です'
          : '年齢は数値で指定してください',
    })
    // // 3
    .min(10, {
      error: (issue) =>
        `年齢は${issue.minimum.toString()}以上で指定してください`,
    })
    .max(60, {
      error: (issue) =>
        `年齢は${issue.maximum.toString()}以下で指定してください`,
    })
    .int('年齢は整数で指定してください'),
});

export { employeeSchema };
