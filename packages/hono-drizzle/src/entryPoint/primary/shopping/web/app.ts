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
import { AddCartItemUseCase } from '../../../../app/useCase/addCartItem.js';
import { ClearCartUseCase } from '../../../../app/useCase/clearCart.js';
import { GetCartUseCase } from '../../../../app/useCase/getCart.js';
import { RemoveCartItemUseCase } from '../../../../app/useCase/removeCartItem.js';
import type { PersistencePortInjector } from '../../../secondary/persistence/injector.js';

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
  (persistencePortInjector: PersistencePortInjector) =>
  (app: App): App =>
    app
      .openapi(
        GetCartRoute,
        GetCartHandler.create(
          persistencePortInjector.injectFunction(GetCartUseCase.create),
        ),
      )
      .openapi(
        AddCartItemRoute,
        AddCartItemHandler.create(
          persistencePortInjector.injectFunction(AddCartItemUseCase.create),
        ),
      )
      .openapi(
        RemoveCartItemRoute,
        RemoveCartItemHandler.create(
          persistencePortInjector.injectFunction(RemoveCartItemUseCase.create),
        ),
      )
      .openapi(
        ClearCartRoute,
        ClearCartHandler.create(
          persistencePortInjector.injectFunction(ClearCartUseCase.create),
        ),
      );

const setupRoute =
  (persistencePortInjector: PersistencePortInjector) =>
  (app: App): App =>
    R.pipe(app, setCartRoute(persistencePortInjector), setDoc, setScalar);

export { setupRoute };
