import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import { ManagementPortInjector } from '../injector/port.js';
import { execute } from './helper/execute.js';
import { AppEnv } from './helper/env.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('name')
  .number('price')
  .demandOption('name')
  .demandOption('price')
  .parseSync();

const appEnv = AppEnv.parse(process.env);

const [rootInjector, managementPortInjector] = ManagementPortInjector.build(
  AppEnv.onMemoryDB(appEnv),
);
const registerProduct = managementPortInjector.resolve(RegisterProduct.token);
const handler = RegisterProductHandler.build(registerProduct);

await R.pipe(argv, execute(handler, rootInjector));
