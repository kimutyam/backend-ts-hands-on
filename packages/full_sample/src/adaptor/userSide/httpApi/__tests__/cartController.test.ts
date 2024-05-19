import type { Cart } from '../../../../domain/cart';
import type { Output, AddCartItemUseCase } from '../../../../useCase/addCartItemUseCase';
import { CartController } from '../cartController';

const buildUseCase = (cart: Cart): AddCartItemUseCase => ({
  async run(): Promise<Output> {
    return { cart };
  },
});

describe('CartController', () => {
  it('put', async () => {
    const controller = new CartController(
      buildUseCase({
        customerId: 'customer-1',
        items: [
          {
            productId: 'product-1',
            price: 100,
            quantity: 3,
          },
        ],
      }),
    );
    const response = await controller.put('customer-1', {
      productId: 'product-1',
      quantity: 3,
    });
    expect(response).toStrictEqual({
      productId: 'product-1',
      price: 100,
      quantity: 3,
    });
  });
});
