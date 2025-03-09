import assert from 'assert';
import { Item } from 'domain_model/999_fully/item.js';

export type Order = Readonly<{
  orderId: string;
  items: ReadonlyArray<Item>;
}>;

const calculateTotal = (
  items: ReadonlyArray<Item>,
): number =>
  items.reduce((acc, item) => acc + Item.total(item), 0);

const CreditLimit = 100_000;

const build = (
  orderId: string,
  items: ReadonlyArray<Item>,
): Order => {
  assert(
    calculateTotal(items) <= CreditLimit,
    `限度額 ${CreditLimit} を上回っています`,
  );
  return { orderId, items };
};

const Order = {
  calculateTotal,
  build,
} as const;
