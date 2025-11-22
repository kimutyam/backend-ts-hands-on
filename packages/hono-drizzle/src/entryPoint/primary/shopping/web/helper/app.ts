import { OpenAPIHono } from '@hono/zod-openapi';

import { CartHandler } from '../../../../../adapter/primary/shopping/web/cartHandler.js';
import { GetCartRoute } from '../../../../../adapter/primary/shopping/web/cartRoute.js';
import { ZodErrorSchema } from '../../../../../adapter/primary/shopping/web/schemas.js';
import type { WebInjector } from '../injector.js';
import { configureOpenAPI } from './openAPIConfig.js';

const makeApp = (webInjector: WebInjector): OpenAPIHono => {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          ZodErrorSchema.parse({
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
    return c.json({ title: 'Internal Server Error' }, 500);
  });

  configureOpenAPI(app);

  // SEE: https://github.com/honojs/middleware/issues/1479
  app.openapi(GetCartRoute, webInjector.injectFunction(CartHandler.create));

  return app;
};
export { makeApp };
