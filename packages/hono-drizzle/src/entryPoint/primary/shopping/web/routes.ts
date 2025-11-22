import type { OpenAPIHono } from '@hono/zod-openapi';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/web/cart/addCartItemHandler.js';
import { ClearCartHandler } from '../../../../adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '../../../../adapter/primary/shopping/web/cart/getHandler.js';
import {
  AddCartItemRoute,
  ClearCartRoute,
  GetCartRoute,
} from '../../../../adapter/primary/shopping/web/cart/routes.js';
import type { WebInjector } from './injector.js';

const configureRoutes = (app: OpenAPIHono, webInjector: WebInjector) =>
  app
    .openapi(GetCartRoute, webInjector.injectFunction(GetCartHandler.create))
    .openapi(
      ClearCartRoute,
      webInjector.injectFunction(ClearCartHandler.create),
    )
    .openapi(
      AddCartItemRoute,
      webInjector.injectFunction(AddCartItemHandler.create),
    );

export { configureRoutes };
