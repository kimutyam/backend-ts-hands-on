import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Price } from '../../../../app/domain/product/price.js';
import { RegisterProduct } from '../../../../app/port/primary/management/registerProduct.js';
import type { ApplicationError } from '../../../../app/util/applicationError.js';
import { buildFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';

const handlerName = 'RegisterProductHandler';

const schema = z
  .object({
    name: z.string().min(1).max(100),
    price: Price.schema,
  })
  .readonly();

type ValidatedArgs = z.infer<typeof schema>;
type Args = z.input<typeof schema>;

interface RegisterProductValidateError
  extends ApplicationError<typeof handlerName> {
  kind: typeof handlerName;
  error: z.ZodError<Args>;
}

type RegisterProductHandler = CommandHandler<Args>;

const safeParse = (
  value: Args,
): Result<ValidatedArgs, RegisterProductValidateError> =>
  R.pipe(
    schema.safeParse(value),
    buildFromZod((zodError) => ({
      kind: handlerName,
      message: zodError.message,
      error: zodError,
    })),
  );

const build =
  (registerProduct: RegisterProduct): RegisterProductHandler =>
  async (args: Args) => {
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
  token: handlerName,
  build,
} as const;

export { RegisterProductHandler };
