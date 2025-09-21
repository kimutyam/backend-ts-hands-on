import { Product } from '../domain/product/product.js';
import { ProductId } from '../domain/product/productId.js';
import type { RegisterProduct } from '../port/primary/management/registerProduct.js';
import { StoreProductEvent } from '../port/secondary/db/productEventStore.js';

const buildRegisterProduct =
  (storeProductEvent: StoreProductEvent): RegisterProduct =>
  async (name, price) => {
    const aggregateId = ProductId.generate();
    const product = Product.init(aggregateId, name, price);
    const event = Product.register(product);
    await storeProductEvent(event, product);
    return event;
  };

buildRegisterProduct.inject = [StoreProductEvent.token] as const;

export { buildRegisterProduct };
