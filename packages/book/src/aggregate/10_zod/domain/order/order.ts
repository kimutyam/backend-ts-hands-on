import { Aggregate } from 'aggregate/10_zod/domain/aggregate.js';
import { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import { Item } from 'aggregate/10_zod/domain/item/item.js';
import { OrderId } from 'aggregate/10_zod/domain/order/orderId.js';
import * as z from 'zod';

const aggregateName = 'order' as const;

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
