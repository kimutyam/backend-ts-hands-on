import { Item } from 'domain_model/142_not_domain_service_but_vo/item.js';

/** 注文 */
export type Order = Readonly<{
  orderId: string;
  items: ReadonlyArray<Item>;
}>;

const calculatePrice = ({ items }: Order): number =>
  items.reduce(
    (acc, item) => acc + Item.calculateTotalPrice(item),
    0,
  );

export const Order = {
  calculatePrice,
} as const;
