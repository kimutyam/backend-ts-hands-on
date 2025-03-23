import { Aggregate } from 'chx/ex10/domain/aggregate.js';
import { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import { Item } from 'chx/ex10/domain/item/item.js';
import { OrderId } from 'chx/ex10/domain/order/orderId.js';
import * as z from 'zod';

const aggregateName = 'order';

const schema = Aggregate.makeSchema(
  OrderId.schema,
  z
    .object({
      customerId: CustomerId.schema,
      items: z.array(Item.schema).readonly(),
    })
    .readonly(),
);

export type Order = z.infer<typeof schema>;

export const Order = {
  aggregateName,
  schema,
} as const;
