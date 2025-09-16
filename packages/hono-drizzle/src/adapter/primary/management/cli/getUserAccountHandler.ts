import type { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';
import type { CommandHandler } from './commandHandler.js';

interface Args {
  id: string;
}

type GetUserAccountHandler = CommandHandler<Args>;

const build =
  (getUserAccount: GetUserAccount): GetUserAccountHandler =>
  async (args: Args) => {
    const { id } = args;
    const userAccount = await getUserAccount(id);
    if (userAccount === undefined) {
      console.error(`UserAccount with id ${id} not found.`);
    } else {
      console.log(userAccount.id, userAccount.name);
    }
  };

const GetUserAccountHandler = {
  build,
} as const;

export { GetUserAccountHandler };
