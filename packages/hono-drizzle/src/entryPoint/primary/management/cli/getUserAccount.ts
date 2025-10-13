import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GetUserAccountHandler } from '../../../../adapter/primary/management/cli/getUserAccountHandler.js';
import { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';
import { AppEnv } from '../../env.js';
import { ManagementPortInjector } from '../injector.js';
import { execute } from './helper/execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('id')
  .demandOption('id')
  .parseSync();

const appEnv = AppEnv.parse(process.env);
const [rootInjector, managementPortInjector] =
  ManagementPortInjector.create(appEnv);
const getUserAccount = managementPortInjector.resolve(GetUserAccount.token);
const handler = GetUserAccountHandler.create(getUserAccount);

await R.pipe(argv, execute(handler, rootInjector));
