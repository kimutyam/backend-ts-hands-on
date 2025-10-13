import type { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';
import type { CommandHandler } from './commandHandler.js';

interface Args {
  id: string;
}

type GetUserAccountHandler = CommandHandler<Args>;

const create =
  (getUserAccount: GetUserAccount): GetUserAccountHandler =>
  async (args) => {
    const { id } = args;
    const userAccount = await getUserAccount(id);
    if (userAccount === undefined) {
      console.error(`UserAccount with id ${id} not found.`);
    } else {
      console.log(userAccount.id, userAccount.name);
    }
  };

const GetUserAccountHandler = {
  create,
} as const;

export { GetUserAccountHandler };
