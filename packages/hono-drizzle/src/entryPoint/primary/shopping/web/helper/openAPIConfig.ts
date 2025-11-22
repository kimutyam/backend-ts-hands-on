import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const openAPIObjectConfig = {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Shopping Cart API',
  },
};

const configureOpenAPI = (app: OpenAPIHono) =>
  app.doc31('/doc', openAPIObjectConfig).get(
    '/ui',
    Scalar({
      url: '/doc',
    }),
  );

export { configureOpenAPI };
