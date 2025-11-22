import { OpenAPIHono } from '@hono/zod-openapi';

import { ClearCartHandler } from '../../../../../adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '../../../../../adapter/primary/shopping/web/cart/getHandler.js';
import {
  ClearCartRoute,
  GetCartRoute,
} from '../../../../../adapter/primary/shopping/web/cart/routes.js';
import {
  createErrorSchema,
  createValidationErrorSchema,
} from '../../../../../adapter/primary/shopping/web/errorSchemas.js';
import type { WebInjector } from '../injector.js';
import { configureOpenAPI } from './openAPIConfig.js';

const configureRoute = (app: OpenAPIHono, webInjector: WebInjector) =>
  app
    .openapi(GetCartRoute, webInjector.injectFunction(GetCartHandler.create))
    .openapi(
      ClearCartRoute,
      webInjector.injectFunction(ClearCartHandler.create),
    );

const makeApp = (webInjector: WebInjector): OpenAPIHono => {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      // SEE: https://github.com/honojs/middleware/issues/1479
      if (!result.success) {
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

  app.onError((err, c) => {
    console.error(err.message);
    return c.json(
      createErrorSchema().parse({
        title: 'Internal Server Error',
      }),
      500,
    );
  });

  configureOpenAPI(app);
  configureRoute(app, webInjector);
  return app;
};
export { makeApp };
