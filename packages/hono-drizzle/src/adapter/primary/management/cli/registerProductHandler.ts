import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Price } from '../../../../app/domain/product/price.js';
import { ProductName } from '../../../../app/domain/product/productName.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import { createWithErrorFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';
import { RegisterProductValidateError } from './registerProductValidateError.js';

const schema = z
  .object({
    name: ProductName.schema,
    price: Price.schema,
  })
  .readonly();

type Args = z.input<typeof schema>;
type ValidatedArgs = z.infer<typeof schema>;
type RegisterProductArgsZodError = z.ZodError<Args>;

type RegisterProductHandler = CommandHandler<Args>;

const safeParse = (
  value: Args,
): Result<ValidatedArgs, RegisterProductValidateError> =>
  R.pipe(
    schema.safeParse(value),
    createWithErrorFromZod(RegisterProductValidateError.create),
  );

const create =
  (registerProduct: RegisterProduct): RegisterProductHandler =>
  async (args) => {
    await safeParse(args)
      .asyncAndThen(({ name, price }) => registerProduct(name, price))
      .andTee((event) => {
        console.log(`Product registered (ID: ${event.aggregateId})`);
      })
      .orTee((error) => {
        console.error(error.message);
      });
  };

create.inject = [RegisterProduct.token] as const;

const RegisterProductHandler = {
  create,
} as const;

export { RegisterProductHandler, type RegisterProductArgsZodError };
