import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { ValidatedEnv } from '../../validatedEnv.js';
import { execute } from './execute.js';
import { CliAdapterInjector } from './injector.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

const env = ValidatedEnv.parse(process.env);

const [rootInjector, cliAdapterInjector] = CliAdapterInjector.create(env);
const handler = cliAdapterInjector.injectFunction(
  RegisterProductHandler.create,
);

await R.pipe(argv, execute(handler, rootInjector));
