import type { Aggregate } from 'ch8/ex1/aggregate.js';
import type { Brand } from 'ch8/ex1/brand.js';
import type { Price } from 'ch8/ex1/price.js';
import type { ProductId } from 'ch8/ex1/productId.js';

const name = 'Product';

interface ProductNotBranded extends Aggregate<ProductId> {
  readonly name: string;
  readonly price: Price;
}

type Product = ProductNotBranded & Brand<typeof name>;

const create = (
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
  create,
} as const;

export { Product };
