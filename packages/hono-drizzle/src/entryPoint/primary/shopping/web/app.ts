import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { requestId } from 'hono/request-id';
import { z } from 'zod';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/web/cart/addCartItemHandler.js';
import { ClearCartHandler } from '../../../../adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '../../../../adapter/primary/shopping/web/cart/getHandler.js';
import { RemoveCartItemHandler } from '../../../../adapter/primary/shopping/web/cart/removeCartItemHandler.js';
import {
  AddCartItemRoute,
  ClearCartRoute,
  GetCartRoute,
  RemoveCartItemRoute,
} from '../../../../adapter/primary/shopping/web/cart/routes.js';
import {
  createErrorSchema,
  createValidationErrorSchema,
} from '../../../../adapter/primary/shopping/web/errorSchemas.js';
import { runWithRequestContext } from '../../../../app/util/requestContext.js';
import type { WebAdapterInjector } from './injector.js';

const makeApp = (webAdapterInjector: WebAdapterInjector): OpenAPIHono => {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      // SEE: https://github.com/honojs/middleware/issues/1479
      if (!result.success) {
        console.log(
          'Validation Error',
          c.get('requestId'),
          z.formatError(result.error),
        );
        return c.json(
          createValidationErrorSchema().parse({
            title: 'Validation Error',
            issues: result.error.issues,
          }),
          422,
        );
      }
      return undefined;
    },
  });

  app.use('*', requestId());
  app.use('*', async (c, next) => {
    await runWithRequestContext(
      {
        requestId: c.get('requestId'),
        primaryPort: 'shopping',
      },
      async () => {
        await next();
      },
    );
  });

  app.notFound((c) => {
    console.log('Not Found', c.get('requestId'), c.req.url);
    return c.json(
      createErrorSchema().parse({
        title: 'Not Found',
      }),
      404,
    );
  });

  app.onError((err, c) => {
    console.error('Internal Server Error', c.get('requestId'), err.message);
    return c.json(
      createErrorSchema().parse({
        title: 'Internal Server Error',
      }),
      500,
    );
  });

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

  app
    .openapi(
      GetCartRoute,
      webAdapterInjector.injectFunction(GetCartHandler.create),
    )
    .openapi(
      AddCartItemRoute,
      webAdapterInjector.injectFunction(AddCartItemHandler.create),
    )
    .openapi(
      RemoveCartItemRoute,
      webAdapterInjector.injectFunction(RemoveCartItemHandler.create),
    )
    .openapi(
      ClearCartRoute,
      webAdapterInjector.injectFunction(ClearCartHandler.create),
    );

  return app;
};
export { makeApp };
