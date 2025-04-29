import { constants } from 'http2';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ICartRepository } from '../src/domain/cartRepository';
import { IProductRepository } from '../src/domain/productRepository';
import { HttpApiModule } from '../src/entryPoint/modules/httpApiModule';

describe('CartController', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpApiModule],
    }).compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    const productRepository = app.get<IProductRepository>(IProductRepository.token);
    const cartRepository = app.get<ICartRepository>(ICartRepository.token);

    const product = {
      productId: 'product-id-1',
      name: 'one',
      price: 100,
    };

    const cart = {
      customerId: 'customer-id-1',
      items: [
        {
          productId: product.productId,
          price: product.price,
          quantity: 2,
        },
      ],
    };
    await productRepository.save(product);
    await cartRepository.save(cart);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('cart', () => {
    it('put', async () => {
      const { statusCode, payload } = await app.inject({
        method: 'PUT',
        url: '/carts/customer-id-1',
        payload: {
          productId: 'product-id-1',
          quantity: 2,
        },
      });
      expect(statusCode).toBe(constants.HTTP_STATUS_CREATED);
      expect(JSON.parse(payload)).toStrictEqual({
        productId: 'product-id-1',
        price: 100,
        quantity: 4,
      });
    });
  });
});
