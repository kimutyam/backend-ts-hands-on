import { ResultAsync } from 'neverthrow';
import type { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { Order } from '../../domain/order/order';
import { OrderId } from '../../domain/order/orderId';
import type { OrderStorer } from '../../domain/order/orderRepository';
import { OrderService } from '../../domain/order/orderService';
import type { Product } from '../../domain/product/product';
import type { ProductsResolver } from '../../domain/product/productRepository';
import type { ProductsNotFoundError } from '../../domain/product/productsNotFoundError';
import type { Input, Output, UseCaseError, OrderUseCase } from './useCase';

export class OrderInteractor implements OrderUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productsResolver: ProductsResolver,
    private orderStorer: OrderStorer,
  ) {}

  // TODO: 集約をまたぐトランザクション
  private async transactionOrder([order, cart]: [Order, Cart]): Promise<[Order, Cart]> {
    await this.orderStorer.store(order);
    await this.cartStorer.store(cart);
    return [order, cart];
  }

  private resolveCartProduct(
    cart: Cart,
  ): ResultAsync<ReadonlyArray<Product>, ProductsNotFoundError> {
    const productIds = cart.items.map(({ productId }) => productId);
    return this.productsResolver.resolveIn(productIds);
  }

  private submitOrder(cart: Cart): ResultAsync<[Order, Cart], ProductsNotFoundError> {
    return this.resolveCartProduct(cart).map((products) =>
      OrderService(cart, products, OrderId.generate),
    );
  }

  run({ customerId }: Input): ResultAsync<Output, UseCaseError> {
    return ResultAsync.fromSafePromise(this.cartResolver.resolveBy(customerId))
      .andThen(this.submitOrder)
      .map(this.transactionOrder);
  }
}
