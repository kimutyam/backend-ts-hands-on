import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/cli/addCartItemHandler.js';
import { AddCartItem } from '../../../../app/port/primary/shopping/addCartItem.js';
import { ManagementPortInjector } from '../injector/port.js';
import { execute } from './helper/execute.js';
import { AppEnv } from '../../helper/env.js';

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
const [rootInjector, managementPortInjector] =
  ManagementPortInjector.build(appEnv);
const addCartItem = managementPortInjector.resolve(AddCartItem.token);
const handler = AddCartItemHandler.build(addCartItem);

await R.pipe(argv, execute(handler, rootInjector));
