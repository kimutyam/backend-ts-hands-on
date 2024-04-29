import * as z from 'zod';
import { Item } from '../cart/item';
import { CustomerId } from '../customer/customerId';
import { OrderId } from './orderId';

const schema = z
  .object({
    orderId: OrderId.schema,
    customerId: CustomerId.schema,
    items: z.array(Item.schema).readonly(),
  })
  .readonly();

export type Order = z.infer<typeof schema>;
