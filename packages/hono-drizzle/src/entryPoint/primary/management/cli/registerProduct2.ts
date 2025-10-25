import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import type { CommandHandler } from '../../../../adapter/primary/management/cli/commandHandler.js';
import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { ProductRepository } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { RegisterProductUseCase } from '../../../../app/useCase/registerProduct.js';

// 手動DI
const productRepository = ProductRepository.create();
const registerProduct = RegisterProductUseCase.create(productRepository.store);
const registerProductHandler = RegisterProductHandler.create(registerProduct);

const argv = yargs(hideBin(process.argv))
  .strict()
  .string('name')
  .number('price')
  .demandOption('name')
  .demandOption('price')
  .parseSync();

const execute =
  <Args>(handler: CommandHandler<Args>) =>
  async (args: Args): Promise<void> => {
    try {
      await handler(args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

await R.pipe(argv, execute(registerProductHandler));
