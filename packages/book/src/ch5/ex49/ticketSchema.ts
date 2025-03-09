import { z } from 'zod';

// ユーザーの年齢と曜日のスキーマ定義
const ticketSchema = z
  .object({
    age: z.number().int().min(0),
    dayOfWeek: z.enum([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]),
  })
  .superRefine((data, ctx) => {
    // 未成年の場合、日曜日のみ許可
    if (data.age < 18) {
      if (data.dayOfWeek !== 'Sunday') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '未成年は日曜日しか選択できません',
        });
      }
    }

    // 成人の場合、日曜日以外を許可
    if (data.age >= 18) {
      if (data.dayOfWeek === 'Sunday') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '成人は日曜日を選択できません',
        });
      }
    }
  });

// {
//   age: number;
//   dayOfWeek:
//     | 'Monday'
//     | 'Tuesday'
//     | 'Wednesday'
//     | 'Thursday'
//     | 'Friday'
//     | 'Saturday'
//     | 'Sunday';
// };
type Ticket = z.infer<typeof ticketSchema>;

export { type Ticket, ticketSchema };
