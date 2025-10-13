import { Product } from '../domain/product/product.js';
import { ProductId } from '../domain/product/productId.js';
import type { RegisterProduct } from '../port/primary/management/registerProduct.js';
import { StoreProductEvent } from '../port/secondary/persistence/productEventStore.js';

const build =
  (storeProductEvent: StoreProductEvent): RegisterProduct =>
  (name, price) => {
    const aggregateId = ProductId.generate();
    return Product.init(aggregateId, name, price)
      .map(Product.register)
      .asyncAndThen(([aggregate, event]) =>
        storeProductEvent(event, aggregate).map(() => event),
      );
  };

build.inject = [StoreProductEvent.token] as const;

const RegisterProductUseCase = {
  build,
} as const;

export { RegisterProductUseCase };
