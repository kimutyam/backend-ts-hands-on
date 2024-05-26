import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../domain/cartRepository';
import { IProductRepository } from '../domain/productRepository';
import type { AddCartItemUseCase, Output, Input } from './addCartItemUseCase';

@Injectable()
export class AddCartItemInteractor implements AddCartItemUseCase {
  constructor(
    @Inject(ICartRepository.token)
    private readonly cartRepository: ICartRepository,
    @Inject(IProductRepository.token)
    private readonly productRepository: IProductRepository,
  ) {}

  async run({ customerId, productId, quantity }: Input): Promise<Output> {
    const maybeProduct = await this.productRepository.findById(productId);
    if (maybeProduct === undefined) {
      throw new Error('商品が存在しません');
    }
    const maybeCart = await this.cartRepository.findById(customerId);
    const cart = maybeCart ?? { customerId, items: [] };
    const items = cart.items.map((currentItem) =>
      currentItem.productId === productId
        ? { ...currentItem, quantity: currentItem.quantity + quantity }
        : currentItem,
    );
    const newCart = { ...cart, items };
    await this.cartRepository.save(newCart);
    return { cart: newCart };
  }
}
