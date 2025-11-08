import type { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { Price } from './price.js';
import type { ProductId } from './productId.js';

const aggregateName = 'Product';

interface ProductNotBranded extends Aggregate<ProductId> {
  readonly name: string;
  readonly price: Price;
}

type Product = ProductNotBranded & Brand<typeof aggregateName>;

const create = (
  aggregateId: ProductId,
  sequenceNumber: number,
  name: string,
  price: Price,
): Product => {
  const notBranded: ProductNotBranded = {
    aggregateId,
    sequenceNumber,
    name,
    price,
  };
  return notBranded as Product;
};

const Product = {
  aggregateName,
  create,
} as const;

export { Product };
