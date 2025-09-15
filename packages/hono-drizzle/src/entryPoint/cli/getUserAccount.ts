import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GetUserAccountHandler } from '../../adapter/primary/cli/getUserAccountHandler.js';
import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { UseCaseInjector } from '../injector/useCase.js';
import { execute } from './helper/execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('id')
  .demandOption('id')
  .parseSync();

// TODO: switch to env var
const [injector, useCaseInjector] = UseCaseInjector.build(true);
const getUserAccount = useCaseInjector.resolve(GetUserAccount.token);
const handler = GetUserAccountHandler.build(getUserAccount);

await R.pipe(argv, execute(handler, injector));
