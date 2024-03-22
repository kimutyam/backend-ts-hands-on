import * as z from 'zod';
import { CustomerId } from '../customer/customerId';
import { OrderId } from './orderId';
import { OrderItem } from './orderItem';

const schema = z
  .object({
    orderId: OrderId.schema,
    customerId: CustomerId.schema,
    orderItems: z.array(OrderItem.schema).readonly(),
  })
  .readonly();

export type Order = z.infer<typeof schema>;
