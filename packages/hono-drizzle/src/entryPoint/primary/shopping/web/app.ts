import { OpenAPIHono } from '@hono/zod-openapi';

import {
  createErrorSchema,
  createValidationErrorSchema,
} from '../../../../adapter/primary/shopping/web/errorSchemas.js';
import type { WebInjector } from './injector.js';
import { configureOpenAPIDoc } from './openAPIDoc.js';
import { configureRoutes } from './routes.js';

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

  app.notFound((c) =>
    c.json(
      createErrorSchema().parse({
        title: 'Not Found',
      }),
      404,
    ),
  );

  app.onError((err, c) => {
    console.error(err.message);
    return c.json(
      createErrorSchema().parse({
        title: 'Internal Server Error',
      }),
      500,
    );
  });

  configureOpenAPIDoc(app);
  configureRoutes(app, webInjector);
  return app;
};
export { makeApp };
