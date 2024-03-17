import assert from 'assert';
import { OrderItem } from './orderItem';

export type Order = Readonly<{
  orderId: string;
  orderItems: ReadonlyArray<OrderItem>;
}>;

const calculateTotal = (orderItems: ReadonlyArray<OrderItem>): number =>
  orderItems.reduce((acc, oi) => acc + OrderItem.total(oi), 0);

const CreditLimit = 100_000;

const build = (orderId: string, orderItems: ReadonlyArray<OrderItem>): Order => {
  assert(calculateTotal(orderItems) <= CreditLimit, `限度額 ${CreditLimit} を上回っています`);
  return { orderId, orderItems };
};

const Order = {
  calculateTotal,
  build,
} as const;
