import assert from 'node:assert';
import { Cart } from '../../1/cart';
import { CartItem } from '../../1/cartItem';
import { CartNotFoundError } from '../../1/cartNotFoundError';
import { CustomerId } from '../../1/customerId';
import { Price } from '../../1/price';
import { ProductId } from '../../1/productId';
import { buildFindCartById, buildSaveCart, buildDeleteCartById } from '../inMemoryCartRepository';

const buildRepository = (
  initialAggregates: Map<CustomerId, Cart> = new Map<CustomerId, Cart>(),
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
    CartItem.buildSingle(ProductId.generate(), Price.build(1000)),
    CartItem.buildSingle(ProductId.generate(), Price.build(1000)),
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
    const repository = buildRepository(new Map([[customerId, cart]]));
    await repository.deleteById(customerId);
    const foundCart = await repository.findById(customerId);
    assert(foundCart.isErr());
    expect(foundCart.error).toBeInstanceOf(CartNotFoundError);
  });
});
