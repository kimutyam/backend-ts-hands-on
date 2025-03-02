import { ResultAsync } from 'neverthrow';
import type { Cart } from '../../domain/cart/cart.js';
import type {
  CartResolver,
  CartStorer,
} from '../../domain/cart/cartRepository.js';
import type { Order } from '../../domain/order/order.js';
import { OrderId } from '../../domain/order/orderId.js';
import type { OrderStorer } from '../../domain/order/orderRepository.js';
import { OrderService } from '../../domain/order/orderService.js';
import type { Product } from '../../domain/product/product.js';
import type { ProductsResolver } from '../../domain/product/productRepository.js';
import type { ProductsNotFoundError } from '../../domain/product/productsNotFoundError.js';
import type {
  Input,
  OrderUseCase,
  Output,
  UseCaseError,
} from './useCase.js';

export class OrderInteractor implements OrderUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productsResolver: ProductsResolver,
    private orderStorer: OrderStorer,
  ) {}

  // TODO: 集約をまたぐトランザクション
  private async transactionOrder([order, cart]: [
    Order,
    Cart,
  ]): Promise<[Order, Cart]> {
    await this.orderStorer.store(order);
    await this.cartStorer.store(cart);
    return [order, cart];
  }

  private resolveCartProduct({
    props,
  }: Cart): ResultAsync<
    ReadonlyArray<Product>,
    ProductsNotFoundError
  > {
    const productIds = props.items.map(
      ({ productId }) => productId,
    );
    return this.productsResolver.resolveIn(productIds);
  }

  private submitOrder(
    cart: Cart,
  ): ResultAsync<[Order, Cart], ProductsNotFoundError> {
    return this.resolveCartProduct(cart).map((products) =>
      OrderService(cart, products, OrderId.generate),
    );
  }

  run({
    customerId,
  }: Input): ResultAsync<Output, UseCaseError> {
    return ResultAsync.fromSafePromise(
      this.cartResolver.resolveById(customerId),
    )
      .andThen(this.submitOrder)
      .map(this.transactionOrder);
  }
}
