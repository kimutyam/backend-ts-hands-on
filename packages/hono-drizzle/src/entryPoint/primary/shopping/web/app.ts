import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';

import type { App } from '../../../../adapter/primary/shopping/web/app.js';
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
import type { WebAdapterInjector } from './injector.js';

const injectToRoute =
  (webAdapterInjector: WebAdapterInjector) =>
  (app: App): App => {
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

const run = (app: App): ServerType =>
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on ${info.port.toString()}`);
    },
  );

export { injectToRoute, run };
