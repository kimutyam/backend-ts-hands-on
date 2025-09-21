import { ResultAsync } from 'neverthrow';

import { Price } from '../../../../app/domain/product/price.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import type { CommandHandler } from './commandHandler.js';

interface Args {
  name: string;
  price: number;
}

type RegisterProductHandler = CommandHandler<Args>;

const build =
  (registerProduct: RegisterProduct): RegisterProductHandler =>
  async (args: Args) => {
    const { name, price } = args;
    await Price.safeParse(price)
      .asyncAndThen((p) =>
        ResultAsync.fromSafePromise(registerProduct(name, p)),
      )
      .andTee(() => {
        console.log(`Product registered`);
      })
      .orTee((error) => {
        console.error(`Error: ${error.kind}`);
      });
  };

build.inject = [RegisterProduct.token] as const;

const RegisterProductHandler = {
  token: 'RegisterProductHandler' as const,
  build,
} as const;

export { RegisterProductHandler };
