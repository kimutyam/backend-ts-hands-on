import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(16, '最低でも16文字にしてください')
  .refine((val) => /^[a-zA-Z0-9]*$/.test(val), { message: '半角英数字のみを使用してください' })
  .refine((val) => /[a-zA-Z]/.test(val), { message: '少なくとも1文字は英字を含めてください' })
  .refine((val) => /[0-9]/.test(val), { message: '少なくとも1文字は数字を含めてください"' });

export { passwordSchema };
