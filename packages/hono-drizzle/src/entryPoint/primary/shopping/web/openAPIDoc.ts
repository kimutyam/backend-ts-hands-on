import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const configureOpenAPIDoc = (app: OpenAPIHono) =>
  app
    .doc31('/doc', {
      openapi: '3.1.0',
      info: {
        version: '1.0.0',
        title: 'Shopping Cart API',
      },
    })
    .get(
      '/scalar',
      Scalar({
        url: '/doc',
      }),
    );

export { configureOpenAPIDoc };
