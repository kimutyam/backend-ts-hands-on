import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { HttpApiModule } from './modules/httpApiModule';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(HttpApiModule, new FastifyAdapter());
  await app.listen(3000);
}

(async () => {
  await bootstrap();
})();
