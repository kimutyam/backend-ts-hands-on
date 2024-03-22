import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/order/cart';
import type { CartResolver, CartStorer } from '../../domain/order/cartRepository';
import type { Order } from '../../domain/order/order';
import { OrderId } from '../../domain/order/orderId';
import type { OrderStorer } from '../../domain/order/orderRepository';
import type { Input, Output, UseCaseError, OrderUseCase } from './useCase';

export class OrderInteractor implements OrderUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private orderStorer: OrderStorer,
  ) {}

  // TODO: 集約をまたぐトランザクション
  async transactionOrder([order, cart]: [Order, Cart]): Promise<[Order, Cart]> {
    await this.orderStorer.store(order);
    await this.cartStorer.store(cart);
    return [order, cart];
  }

  run({ customerId }: Input): ResultAsync<Output, UseCaseError> {
    return this.cartResolver
      .resolveBy(customerId)
      .map(Cart.submitOrder(OrderId.generate))
      .map(this.transactionOrder);
  }
}
