import { Item } from './item';

/** 注文 */
export type Order = Readonly<{
  orderId: string;
  items: ReadonlyArray<Item>;
}>;

export const calculatePrice = ({ items }: Order): number =>
  items.reduce((acc, item) => acc + Item.calculateTotalPrice(item), 0);

export const Order = {
  calculatePrice,
} as const;
