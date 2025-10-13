import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Quantity } from '../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../app/domain/customer/customerId.js';
import { ProductId } from '../../../../app/domain/product/productId.js';
import type { AddCartItem } from '../../../../app/port/primary/shopping/addCartItem.js';
import type { ApplicationError } from '../../../../app/util/applicationError.js';
import { createWithErrorFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';

const handlerName = 'AddCartItemHandler';

const schema = z.object({
  customerId: CustomerId.schema,
  productId: ProductId.schema,
  quantity: Quantity.schema,
});

type ValidatedArgs = z.infer<typeof schema>;
type Args = z.input<typeof schema>;

interface ArgsValidateError extends ApplicationError<typeof handlerName> {
  error: z.ZodError<Args>;
}

type AddCartItemHandler = CommandHandler<Args>;

const safeParse = (value: Args): Result<ValidatedArgs, ArgsValidateError> =>
  R.pipe(
    schema.safeParse(value),
    createWithErrorFromZod((zodError) => ({
      kind: handlerName,
      message: zodError.message,
      error: zodError,
    })),
  );

const create =
  (addCartItem: AddCartItem): AddCartItemHandler =>
  async (args) => {
    await safeParse(args)
      .asyncAndThen(({ customerId, productId, quantity }) =>
        addCartItem(customerId, productId, quantity),
      )
      .andTee((event) => {
        console.log(event);
      })
      .orTee((error) => {
        console.error(error.message);
      });
  };

const AddCartItemHandler = {
  token: handlerName,
  create,
} as const;

export { AddCartItemHandler };
