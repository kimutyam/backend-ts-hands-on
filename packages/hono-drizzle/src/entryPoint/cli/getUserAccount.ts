import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GetUserAccountHandler } from '../../adapter/primary/cli/getUserAccountHandler.js';
import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { buildInjector } from '../injector/cli.js';
import { execute } from './execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('id')
  .demandOption('id')
  .parseSync();

const [injector, useCaseInjector] = buildInjector();
const getUserAccount = useCaseInjector.resolve(GetUserAccount.token);
const handler = GetUserAccountHandler.build(getUserAccount);

await R.pipe(argv, execute(handler, injector));
