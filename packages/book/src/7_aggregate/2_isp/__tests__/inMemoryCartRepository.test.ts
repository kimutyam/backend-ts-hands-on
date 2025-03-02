import assert from 'node:assert';
import { Cart } from '../../1/cart.js';
import { CartItem } from '../../1/cartItem.js';
import { CartNotFoundError } from '../../1/cartNotFoundError.js';
import { CustomerId } from '../../1/customerId.js';
import { Price } from '../../1/price.js';
import { ProductId } from '../../1/productId.js';
import {
  buildDeleteCartById,
  buildFindCartById,
  buildSaveCart,
} from '../inMemoryCartRepository.js';

const buildRepository = (
  initialAggregates: Map<CustomerId, Cart> = new Map<
    CustomerId,
    Cart
  >(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindCartById(aggregates),
    save: buildSaveCart(aggregates),
    deleteById: buildDeleteCartById(aggregates),
  };
};

const makeCart = (customerId: CustomerId): Cart =>
  Cart.build(customerId, [
    CartItem.buildSingle(
      ProductId.generate(),
      Price.build(1000),
    ),
    CartItem.buildSingle(
      ProductId.generate(),
      Price.build(1000),
    ),
  ]);

describe('InMemoryCartRepository', () => {
  it('保存できる', async () => {
    const repository = buildRepository();
    const customerId = CustomerId.generate();
    const cart = makeCart(customerId);
    await repository.save(cart);
    const foundCart = await repository.findById(customerId);
    assert(foundCart.isOk());
    expect(foundCart.value).toEqual(cart);
  });

  it('削除できる', async () => {
    const customerId = CustomerId.generate();
    const cart = makeCart(customerId);
    const repository = buildRepository(
      new Map([[customerId, cart]]),
    );
    await repository.deleteById(customerId);
    const foundCart = await repository.findById(customerId);
    assert(foundCart.isErr());
    expect(foundCart.error).toBeInstanceOf(
      CartNotFoundError,
    );
  });
});
