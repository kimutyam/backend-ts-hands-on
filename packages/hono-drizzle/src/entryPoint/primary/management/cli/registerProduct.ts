import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { RegisterProductUseCase } from '../../../../app/useCase/registerProduct.js';
import { AppEnv } from '../../env.js';
import { ManagementPortInjector } from '../injector.js';
import { execute } from './helper/execute.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

const appEnv = AppEnv.parse(process.env);

const [rootInjector, managementPortInjector] =
  ManagementPortInjector.create(appEnv);
const registerProduct = managementPortInjector.injectFunction(
  RegisterProductUseCase.create,
);
const handler = RegisterProductHandler.create(registerProduct);

await R.pipe(argv, execute(handler, rootInjector));
