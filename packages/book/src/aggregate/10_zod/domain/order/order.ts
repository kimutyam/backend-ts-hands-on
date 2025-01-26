import * as z from 'zod';
import { Aggregate } from '../aggregate.js';
import { CustomerId } from '../customer/customerId.js';
import { Item } from '../item/item.js';
import { OrderId } from './orderId.js';

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
