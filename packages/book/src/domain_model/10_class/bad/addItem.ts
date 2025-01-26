import type { Product } from './product.js';

export class Item {
  constructor(
    private product: Product,
    public quantity: number,
  ) {}

  add(quantity: number): void {
    this.quantity += quantity;
  }

  get total(): number {
    return this.product.price * this.quantity;
  }

  updatePrice(price: number): void {
    this.product.price = price;
  }
}
