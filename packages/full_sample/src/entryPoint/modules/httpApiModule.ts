import { Module } from '@nestjs/common';
import { CartController } from '../../adaptor/userSide/httpApi/cartController';
import { HealthCheckController } from '../../adaptor/userSide/httpApi/helthCheckController';
import { UseCaseModule } from './useCaseModule';

@Module({
  imports: [UseCaseModule],
  controllers: [CartController, HealthCheckController],
})
export class HttpApiModule {}
