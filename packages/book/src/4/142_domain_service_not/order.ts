import { OrderItem } from './orderItem';

/** 注文 */
export type Order = {
  orderId: string;
  orderItems: ReadonlyArray<OrderItem>;
};

export const calculatePrice = ({ orderItems }: Order): number =>
  orderItems.reduce((acc, item) => acc + OrderItem.calculateTotalPrice(item), 0);

export const Order = {
  calculatePrice,
} as const;
