import { z } from 'zod';
import { Age } from './domain/age';
import { UserAccount } from './domain/userAccount';
import { UserAccountName } from './domain/userAccountName';

function main(args: unknown): void {
  const zodType = z.object({
    name: UserAccountName.zodEffects,
    age: Age.zodEffects,
  });

  const returnType = zodType.safeParse(args);
  if (returnType.success) {
    const { id } = UserAccount.create(returnType.data);
    /* eslint-disable-next-line no-console */
    console.log(id);
  } else {
    /* eslint-disable-next-line no-console */
    console.error(returnType.error.message);
  }
}

main({ name: 'kimutyam', age: 10 });
