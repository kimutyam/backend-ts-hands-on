import { assert, expect } from 'vitest';

import { ticketSchema } from '../ticketSchema.js';

describe('safeParse', () => {
  it.each([
    {
      age: 10,
      dayOfWeek: 'Friday',
      expected: '未成年は日曜日しか選択できません',
    },
    {
      age: 20,
      dayOfWeek: 'Sunday',
      expected: '成人は日曜日を選択できません',
    },
  ])('チケット', ({ age, dayOfWeek, expected }) => {
    const result = ticketSchema.safeParse({
      age,
      dayOfWeek,
    });
    assert(!result.success);
    expect(result.error.format()).toStrictEqual({
      _errors: [expected],
    });
  });
});
