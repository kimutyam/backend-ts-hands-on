import type { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { Price } from './price.js';
import type { ProductId } from './productId.js';

const name = 'Product';

interface ProductNotBranded extends Aggregate<ProductId> {
  readonly name: string;
  readonly price: Price;
}

type Product = ProductNotBranded & Brand<typeof name>;

const build = (
  aggregateId: ProductId,
  sequenceNumber: number,
  productName: string,
  price: Price,
): Product => {
  const notBranded: ProductNotBranded = {
    aggregateId,
    sequenceNumber,
    name: productName,
    price,
  };
  return notBranded as Product;
};

const Product = {
  name,
  build,
} as const;

export { Product };
