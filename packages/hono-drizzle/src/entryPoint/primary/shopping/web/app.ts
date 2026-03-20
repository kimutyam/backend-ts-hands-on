import { Scalar } from '@scalar/hono-api-reference';
import * as R from 'remeda';

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
import type { ShoppingPortInjector } from '../injector.js';

const setScalar = (app: App): App => {
  app.get(
    '/scalar',
    Scalar({
      url: '/doc',
    }),
  );
  return app;
};

const setDoc = (app: App): App =>
  app.doc31('/doc', {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Shopping Cart API',
    },
  });

const setCartRoute =
  (shoppingPortInjector: ShoppingPortInjector) =>
  (app: App): App =>
    app
      .openapi(
        GetCartRoute,
        shoppingPortInjector.injectFunction(GetCartHandler.create),
      )
      .openapi(
        AddCartItemRoute,
        shoppingPortInjector.injectFunction(AddCartItemHandler.create),
      )
      .openapi(
        RemoveCartItemRoute,
        shoppingPortInjector.injectFunction(RemoveCartItemHandler.create),
      )
      .openapi(
        ClearCartRoute,
        shoppingPortInjector.injectFunction(ClearCartHandler.create),
      );

const setupRoute =
  (shoppingPortInjector: ShoppingPortInjector) =>
  (app: App): App =>
    R.pipe(app, setCartRoute(shoppingPortInjector), setDoc, setScalar);

export { setupRoute };
