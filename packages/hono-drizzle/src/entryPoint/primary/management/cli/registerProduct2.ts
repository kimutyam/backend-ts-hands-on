import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { ProductRepositoryOnMemory } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { RegisterProductUseCase } from '../../../../app/useCase/registerProduct.js';
import { execute } from './execute2.js';

// 1
const productRepository = ProductRepositoryOnMemory.create();
const registerProduct = RegisterProductUseCase.create(productRepository.store);
const registerProductHandler = RegisterProductHandler.create(registerProduct);

// 2
const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

// 3
await R.pipe(argv, execute(registerProductHandler));
