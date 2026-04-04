import { Product } from '#/app/domain/product/product.js';
import { ProductId } from '#/app/domain/product/productId.js';
import type { RegisterProduct } from '#/app/port/primary/management/registerProduct.js';
import { StoreProductEvent } from '#/app/port/secondary/persistence/productEventStore.js';

const create =
  (storeProductEvent: StoreProductEvent): RegisterProduct =>
  (name, price) => {
    const aggregateId = ProductId.generate();
    return Product.init(aggregateId, name, price)
      .map(Product.register)
      .asyncAndThrough(([aggregate, event]) =>
        storeProductEvent(event, aggregate),
      )
      .map(([, event]) => event);
  };

create.inject = [StoreProductEvent.token] as const;

const RegisterProductUseCase = {
  create,
} as const;

export { RegisterProductUseCase };
