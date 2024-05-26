import { Module } from '@nestjs/common';
import { CartRepository } from '../../adaptor/serverSide/memory/cartRepository';
import { ProductRepository } from '../../adaptor/serverSide/memory/productRepository';
import { ICartRepository } from '../../domain/cartRepository';
import { IProductRepository } from '../../domain/productRepository';

const providers = [
  {
    provide: IProductRepository.token,
    useClass: ProductRepository,
  },
  {
    provide: ICartRepository.token,
    useClass: CartRepository,
  },
];

@Module({
  providers,
  exports: providers,
})
export class MemoryModule {}
