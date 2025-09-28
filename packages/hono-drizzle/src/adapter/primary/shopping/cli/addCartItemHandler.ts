import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Quantity } from '../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../app/domain/customer/customerId.js';
import { ProductId } from '../../../../app/domain/product/productId.js';
import type { AddCartItem } from '../../../../app/port/primary/shopping/addCartItem.js';
import type { ApplicationError } from '../../../../app/util/applicationError.js';
import { buildFromZod } from '../../../../app/util/result.js';
import type { CommandHandler } from './commandHandler.js';

const name = 'AddCartItemHandler';

const schema = z.object({
  customerId: CustomerId.schema,
  productId: ProductId.schema,
  quantity: Quantity.schema,
});

type Args = z.infer<typeof schema>;
type ArgsInput = z.input<typeof schema>;

interface ArgsValidateError extends ApplicationError<typeof name> {
  error: z.ZodError<ArgsInput>;
}

type AddCartItemHandler = CommandHandler<ArgsInput>;

const safeParse = (value: ArgsInput): Result<Args, ArgsValidateError> =>
  R.pipe(
    schema.safeParse(value),
    buildFromZod((zodError) => ({
      kind: name,
      message: zodError.message,
      error: zodError,
    })),
  );

const build =
  (addCartItem: AddCartItem): AddCartItemHandler =>
  async (args) => {
    await safeParse(args)
      .asyncAndThen(({ customerId, productId, quantity }) =>
        addCartItem(customerId, productId, quantity),
      )
      .andTee((event) => {
        console.log(event);
      })
      .orTee(
        // TODO: Error由来のProductNotFoundなどはkindがない..
        () => {
          console.error(`Error`);
        },
      );
  };

const AddCartItemHandler = {
  token: name,
  build,
} as const;

export { AddCartItemHandler };
