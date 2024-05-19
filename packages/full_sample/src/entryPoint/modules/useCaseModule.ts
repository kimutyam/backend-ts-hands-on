import { Module } from '@nestjs/common';
import { AddCartItemInteractor } from '../../useCase/addCartItemInteractor';
import { AddCartItemUseCase } from '../../useCase/addCartItemUseCase';
import { MemoryModule } from './memoryModule';

const providers = [
  {
    provide: AddCartItemUseCase.token,
    useClass: AddCartItemInteractor,
  },
];

@Module({
  imports: [MemoryModule],
  providers,
  exports: providers,
})
export class UseCaseModule {}
