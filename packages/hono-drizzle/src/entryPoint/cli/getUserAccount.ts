import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GetUserAccountHandler } from '../../adapter/primary/management/cli/getUserAccountHandler.js';
import { GetUserAccount } from '../../app/port/primary/management/getUserAccount.js';
import { ManagementPortInjector } from '../injector/primary/management/port.js';
import { execute } from './helper/execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('id')
  .demandOption('id')
  .parseSync();

// TODO: switch to env var
const [rootInjector, managementPortInjector] =
  ManagementPortInjector.build(true);
const getUserAccount = managementPortInjector.resolve(GetUserAccount.token);
const handler = GetUserAccountHandler.build(getUserAccount);

await R.pipe(argv, execute(handler, rootInjector));
