import { Module } from '@nestjs/common';
import { AppController } from './appController';
import { AppService } from './appService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
