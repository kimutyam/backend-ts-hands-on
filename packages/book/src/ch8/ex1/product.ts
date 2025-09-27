import type { Aggregate } from 'ch8/ex1/aggregate.js';
import type { Brand } from 'ch8/ex1/brand.js';
import type { Price } from 'ch8/ex1/price.js';
import type { ProductId } from 'ch8/ex1/productId.js';

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
