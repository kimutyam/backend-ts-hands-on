import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Price } from '../../../../app/domain/product/price.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import type { ApplicationError } from '../../../../app/util/applicationError.js';
import { createWithErrorFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';

const errorKind = 'RegisterProductHandlerError';

const schema = z
  .object({
    name: z.string().min(1).max(100),
    price: Price.schema,
  })
  .readonly();

type ValidatedArgs = z.infer<typeof schema>;
type Args = z.input<typeof schema>;

interface RegisterProductValidateError
  extends ApplicationError<typeof errorKind> {
  error: z.ZodError<Args>;
}

const createError = (
  error: z.ZodError<Args>,
): RegisterProductValidateError => ({
  kind: errorKind,
  message: error.message,
  error,
});

type RegisterProductHandler = CommandHandler<Args>;

const safeParse = (
  value: Args,
): Result<ValidatedArgs, RegisterProductValidateError> =>
  R.pipe(schema.safeParse(value), createWithErrorFromZod(createError));

const build =
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

build.inject = [RegisterProduct.token] as const;

const RegisterProductHandler = {
  token: errorKind,
  build,
} as const;

export { RegisterProductHandler };
