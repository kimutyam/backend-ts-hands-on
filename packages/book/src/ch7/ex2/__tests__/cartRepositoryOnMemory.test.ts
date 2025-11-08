import assert from 'node:assert';

import { Cart } from '../../ex1/cart.js';
import { CartItem } from '../../ex1/cartItem.js';
import { CustomerId } from '../../ex1/customerId.js';
import { Price } from '../../ex1/price.js';
import { ProductId } from '../../ex1/productId.js';
import { CartRepository } from '../cartRepositoryOnMemory.js';

const createCart = (customerId: CustomerId): Cart =>
  Cart.create(customerId, [
    CartItem.createSingleQuantity(ProductId.generate(), Price.valueOf(1000)),
    CartItem.createSingleQuantity(ProductId.generate(), Price.valueOf(1000)),
  ]);

describe('InMemoryCartRepository', () => {
  it('保存できる', async () => {
    const repository = CartRepository.create();
    const customerId = CustomerId.generate();
    const cart = createCart(customerId);
    await repository.store(cart);
    const foundCart = await repository.findById(customerId);
    assert(foundCart.isOk());
    expect(foundCart.value).toEqual(cart);
  });

  it('削除できる', async () => {
    const customerId = CustomerId.generate();
    const cart = createCart(customerId);
    const repository = CartRepository.create(new Map([[customerId, cart]]));
    await repository.deleteById(customerId);
    const foundCart = await repository.findById(customerId);
    assert(foundCart.isErr());
    expect(foundCart.error.customerId).toBe(customerId);
  });
});
