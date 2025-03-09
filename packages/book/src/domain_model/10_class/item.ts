import type { Product } from 'domain_model/10_class/product.js';

export class Item {
  constructor(
    private readonly product: Product,
    public readonly quantity: number,
  ) {}

  add(quantity: number): Item {
    return new Item(this.product, this.quantity + quantity);
  }

  get total(): number {
    return this.product.price * this.quantity;
  }
}
