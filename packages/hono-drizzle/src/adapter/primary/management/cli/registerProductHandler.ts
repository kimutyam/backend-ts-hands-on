import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Price } from '../../../../app/domain/product/price.js';
import { ProductName } from '../../../../app/domain/product/productName.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import { createFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';
import { RegisterProductValidateError } from './registerProductValidateError.js';

// 1
const schema = z
  .object({
    name: ProductName.schema,
    price: Price.schema,
  })
  .readonly();

type Args = z.input<typeof schema>;
type ValidatedArgs = z.infer<typeof schema>;
type RegisterProductArgsZodError = z.ZodError<ValidatedArgs>;

type RegisterProductHandler = CommandHandler<Args>;

// 2
const safeParse = (
  value: Args,
): Result<ValidatedArgs, RegisterProductValidateError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(RegisterProductValidateError.create),
  );

// 3
const create =
  (registerProduct: RegisterProduct): RegisterProductHandler =>
  async (args) => {
    // 4
    await safeParse(args)
      .asyncAndThen(({ name, price }) => registerProduct(name, price))
      .match(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.error(error.message);
        },
      );
  };

create.inject = [RegisterProduct.token] as const;

const RegisterProductHandler = {
  token: 'RegisterProductHandler',
  create,
} as const;

export { RegisterProductHandler, type RegisterProductArgsZodError };
