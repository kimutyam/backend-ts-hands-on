import type { Aggregate } from '8_domain_event/1/aggregate.js';
import type { Brand } from '8_domain_event/1/brand.js';
import type { Price } from '8_domain_event/1/price.js';
import type { ProductId } from '8_domain_event/1/productId.js';

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
