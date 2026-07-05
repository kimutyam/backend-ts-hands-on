import type {
  Hook,
  OpenAPIHonoOptions,
  // RouteConfigToTypedResponse,
} from '@hono/zod-openapi';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
// import type { TypedResponse } from 'hono';
import { createMiddleware } from 'hono/factory';
import { requestId } from 'hono/request-id';
import { z } from 'zod';

import type { AppVariables } from '#/adapter/primary/shopping/web/appVariables.js';
import { AddCartItemHandler } from '#/adapter/primary/shopping/web/cart/addCartItemHandler.js';
import { ClearCartHandler } from '#/adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '#/adapter/primary/shopping/web/cart/getHandler.js';
import { RemoveCartItemHandler } from '#/adapter/primary/shopping/web/cart/removeCartItemHandler.js';
import {
  AddCartItemRoute,
  ClearCartRoute,
  GetCartRoute,
  RemoveCartItemRoute,
} from '#/adapter/primary/shopping/web/cart/routes.js';
import {
  ErrorSchema,
  ValidationErrorSchema,
} from '#/adapter/primary/shopping/web/errorSchemas.js';
import { OptimisticLockError } from '#/app/domain/optimisticLockError.js';
import { RequestContext } from '#/app/util/requestContext.js';
import type { ShoppingPortInjector } from '#/entryPoint/primary/shopping/injector.js';

type App = OpenAPIHono<AppVariables>;
type BadRequestHook = Hook<unknown, AppVariables, string, any>;

const defaultHook: OpenAPIHonoOptions<AppVariables>['defaultHook'] = (
  result,
  c,
) => {
  // SEE: https://github.com/honojs/middleware/issues/1479
  if (!result.success) {
    console.log(
      'Validation Error',
      c.get('requestId'),
      z.formatError(result.error),
    );
    return c.json(
      ValidationErrorSchema.parse({
        title: 'Validation Error',
        issues: result.error.issues,
      }),
      422,
    );
  }
  return undefined;
};

const badRequestHook: BadRequestHook = (result, c) => {
  if (!result.success) {
    console.log(
      'Bad Request Error',
      c.get('requestId'),
      z.formatError(result.error),
    );
    return c.json(
      ValidationErrorSchema.parse({
        title: 'Bad Request Error',
        issues: result.error.issues,
      }),
      400,
    );
  }
  return undefined;
};

const createRequestContext = createMiddleware(async (c, next) => {
  await RequestContext.runWith(
    {
      requestId: c.get('requestId'),
      primaryPort: 'shopping',
    },
    async () => {
      await next();
    },
  );
});

const setMiddleware = (app: App) => {
  app.use('*', requestId());
  app.use('*', createRequestContext);
};

const setNotFoundHandler = (app: App) => {
  app.notFound((c) => {
    console.log('Not Found', c.get('requestId'), c.req.url);
    return c.json(
      ErrorSchema.parse({
        title: 'Not Found',
      }),
      404,
    );
  });
};

const setErrorHandler = (app: App) => {
  app.onError((err, c) => {
    console.error('Internal Server Error', c.get('requestId'), err);
    if (err instanceof OptimisticLockError) {
      return c.json(
        ErrorSchema.parse({
          title: 'Conflict Error',
        }),
        409,
      );
    }
    return c.json(
      ErrorSchema.parse({
        title: 'Internal Server Error',
      }),
      500,
    );
  });
};

const setRouteOfCart = (
  app: App,
  shoppingPortInjector: ShoppingPortInjector,
) => {
  app
    .openapi(
      GetCartRoute,
      shoppingPortInjector.injectFunction(GetCartHandler.create),
      badRequestHook,
    )
    .openapi(
      AddCartItemRoute,
      shoppingPortInjector.injectFunction(AddCartItemHandler.create),
    )
    .openapi(
      RemoveCartItemRoute,
      shoppingPortInjector.injectFunction(RemoveCartItemHandler.create),
      badRequestHook,
    )
    .openapi(
      ClearCartRoute,
      shoppingPortInjector.injectFunction(ClearCartHandler.create),
      badRequestHook,
    );
};

const setDoc = (app: App) => {
  app.doc31('/doc', {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Shopping Cart API',
    },
  });
};

const setScalar = (app: App) => {
  app.get(
    '/scalar',
    Scalar({
      url: '/doc',
    }),
  );
};

const create = (shoppingPortInjector: ShoppingPortInjector): App => {
  const app = new OpenAPIHono<AppVariables>({
    defaultHook,
  });

  setMiddleware(app);
  setNotFoundHandler(app);
  setErrorHandler(app);
  setRouteOfCart(app, shoppingPortInjector);
  setDoc(app);
  setScalar(app);
  return app;
};

const App = {
  create,
} as const;

export { App };
