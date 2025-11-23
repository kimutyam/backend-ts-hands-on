import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { AppEnv } from '../../env.js';
import { execute } from './execute.js';
import { CliInjector } from './injector.js';

const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

const appEnv = AppEnv.parse(process.env);

const [rootInjector, cliInjector] = CliInjector.create(appEnv);
const handler = cliInjector.injectFunction(RegisterProductHandler.create);

await R.pipe(argv, execute(handler, rootInjector));
