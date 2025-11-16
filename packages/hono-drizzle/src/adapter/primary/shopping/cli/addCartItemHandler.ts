import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Quantity } from '../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../app/domain/customer/customerId.js';
import { ProductId } from '../../../../app/domain/product/productId.js';
import { AddCartItem } from '../../../../app/port/primary/shopping/addCartItem.js';
import { createFromZod } from '../../../../app/util/result.js';
import { AddCartItemValidateError } from './addCartItemValidateError.js';
import type { CommandHandler } from './commandHandler.js';

const schema = z.object({
  customerId: CustomerId.schema,
  productId: ProductId.schema,
  quantity: Quantity.schema,
});

type Args = z.input<typeof schema>;
type ValidatedArgs = z.infer<typeof schema>;
type AddCartItemArgsZodError = z.ZodError<ValidatedArgs>;

type AddCartItemHandler = CommandHandler<Args>;

const safeParse = (
  value: Args,
): Result<ValidatedArgs, AddCartItemValidateError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(AddCartItemValidateError.create),
  );

const create =
  (addCartItem: AddCartItem): AddCartItemHandler =>
  async (args) => {
    await safeParse(args)
      .asyncAndThen(({ customerId, productId, quantity }) =>
        addCartItem(customerId, productId, quantity),
      )
      .match(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.error(error.message);
        },
      );
  };

create.inject = [AddCartItem.token] as const;

const AddCartItemHandler = {
  token: 'AddCartItemHandler',
  create,
} as const;

export { AddCartItemHandler, type AddCartItemArgsZodError };
