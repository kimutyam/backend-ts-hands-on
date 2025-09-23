import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GetUserAccountHandler } from '../../../../adapter/primary/management/cli/getUserAccountHandler.js';
import { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';
import { AppEnv } from '../../helper/env.js';
import { ManagementPortInjector } from '../injector/port.js';
import { execute } from './helper/execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('id')
  .demandOption('id')
  .parseSync();

const appEnv = AppEnv.parse(process.env);
const [rootInjector, managementPortInjector] =
  ManagementPortInjector.build(appEnv);
const getUserAccount = managementPortInjector.resolve(GetUserAccount.token);
const handler = GetUserAccountHandler.build(getUserAccount);

await R.pipe(argv, execute(handler, rootInjector));
