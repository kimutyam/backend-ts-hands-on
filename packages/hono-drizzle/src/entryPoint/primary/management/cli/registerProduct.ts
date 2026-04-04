import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '#/adapter/primary/management/cli/registerProductHandler.js';
import { execute } from '#/entryPoint/primary/management/cli/execute.js';
import { ManagementPortInjector } from '#/entryPoint/primary/management/injector.js';
import { ValidatedEnv } from '#/entryPoint/primary/validatedEnv.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

const env = ValidatedEnv.parse(process.env);

const [rootInjector, managementPortInjector] =
  ManagementPortInjector.create(env);
const handler = managementPortInjector.injectFunction(
  RegisterProductHandler.create,
);

await R.pipe(argv, execute(handler, rootInjector));
