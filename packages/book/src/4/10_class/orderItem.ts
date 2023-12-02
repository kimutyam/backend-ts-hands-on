import type { Product } from './product';

export class OrderItem {
  constructor(
    private readonly product: Product,
    public readonly quantity: number,
  ) {}

  add(quantity: number): OrderItem {
    return new OrderItem(this.product, this.quantity + quantity);
  }

  get total(): number {
    return this.product.price * this.quantity;
  }
}
