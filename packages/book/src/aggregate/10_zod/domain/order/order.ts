import * as z from 'zod';
import { Aggregate } from '../aggregate';
import { CustomerId } from '../customer/customerId';
import { Item } from '../item/item';
import { OrderId } from './orderId';

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
  name: 'order' as const,
} as const;
