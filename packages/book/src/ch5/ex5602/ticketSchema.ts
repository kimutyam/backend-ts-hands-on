import { z } from 'zod';

// 1
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
    // 2
    if (data.age < 18) {
      if (data.dayOfWeek !== 'Sunday') {
        ctx.addIssue({
          code: 'custom',
          message: '未成年は日曜日しか選択できません',
        });
      }
    }

    // 3
    if (data.age >= 18) {
      if (data.dayOfWeek === 'Sunday') {
        ctx.addIssue({
          code: 'custom',
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
