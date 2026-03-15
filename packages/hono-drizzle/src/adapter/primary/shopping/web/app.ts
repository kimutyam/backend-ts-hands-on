import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import type { RequestIdVariables } from 'hono/request-id';
import { requestId } from 'hono/request-id';
import { z } from 'zod';

import { OptimisticLockError } from '../../../../app/domain/optimisticLockError.js';
import { runWithRequestContext } from '../../../../app/util/requestContext.js';
import { ErrorSchema, ValidationErrorSchema } from './responseSchemas.js';

type AppEnv = {
  Variables: RequestIdVariables;
};

const create = (): OpenAPIHono<AppEnv> => {
  const app = new OpenAPIHono<AppEnv>({
    defaultHook: (result, c) => {
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
      ErrorSchema.parse({
        title: 'Not Found',
      }),
      404,
    );
  });

  app.onError((err, c) => {
    console.error('Internal Server Error', c.get('requestId'), err.message);
    if (err instanceof OptimisticLockError) {
      return c.json(
        ErrorSchema.parse({
          title: 'Conflict Error',
          detail: err.message,
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
  return app;
};

type App = ReturnType<typeof create>;
const App = {
  create,
} as const;

export { App, type AppEnv };
