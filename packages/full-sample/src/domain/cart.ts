import type { CustomerId } from './customerId';
import type { Item } from './item';

export type Cart = Readonly<{
  customerId: CustomerId;
  items: ReadonlyArray<Item>;
}>;
