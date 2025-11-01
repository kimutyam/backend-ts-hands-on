import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/cli/addCartItemHandler.js';
import { AppEnv } from '../../env.js';
import { execute } from './helper/execute.js';
import { CliInjector } from './injector.js';

// TODO: web api
const argv = yargs(hideBin(process.argv))
  .strict()
  .string('customerId')
  .string('productId')
  .number('quantity')
  .demandOption('customerId')
  .demandOption('productId')
  .demandOption('quantity')
  .parseSync();

const appEnv = AppEnv.parse(process.env);
const [rootInjector, cliInjector] = CliInjector.create(appEnv);
const handler = cliInjector.injectFunction(AddCartItemHandler.create);

await R.pipe(argv, execute(handler, rootInjector));
