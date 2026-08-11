import { RegisterProductHandler } from '#/adapter/primary/management/cli/registerProductHandler.js';
import { AddCartItemHandler } from '#/adapter/primary/shopping/web/cart/addCartItemHandler.js';
import { ClearCartHandler } from '#/adapter/primary/shopping/web/cart/clearCartHandler.js';
import { GetCartHandler } from '#/adapter/primary/shopping/web/cart/getCartHandler.js';
import { RemoveCartItemHandler } from '#/adapter/primary/shopping/web/cart/removeCartItemHandler.js';
import { CartRepositoryOnMemory } from '#/adapter/secondary/persistence/memory/cartRepositoryOnMemory.js';
import { ProductRepositoryOnMemory } from '#/adapter/secondary/persistence/memory/productRepositoryOnMemory.js';
import { CartRepositoryOnRdb } from '#/adapter/secondary/persistence/rdb/cartRepositoryOnRdb.js';
import { DatabaseUrl } from '#/adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { ProductRepositoryOnRdb } from '#/adapter/secondary/persistence/rdb/productRepositoryOnRdb.js';
import { StoreCartEventOnRdb } from '#/adapter/secondary/persistence/rdb/storeCartEventOnRdb.js';
import { StoreProductEventOnRdb } from '#/adapter/secondary/persistence/rdb/storeProductEventOnRdb.js';
import type { StoreCartEvent } from '#/app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';
import type { StoreProductEvent } from '#/app/port/secondary/persistence/productEventStore.js';
import type { FindProductById } from '#/app/port/secondary/persistence/productRepository.js';
import { AddCartItemUseCase } from '#/app/useCase/addCartItem.js';
import { ClearCartUseCase } from '#/app/useCase/clearCart.js';
import { GetCartUseCase } from '#/app/useCase/getCart.js';
import { RegisterProductUseCase } from '#/app/useCase/registerProduct.js';
import { RemoveCartItemUseCase } from '#/app/useCase/removeCartItem.js';

const rawDatabaseUrl = process.env['DATABASE_URL'];
const databaseUrl =
  rawDatabaseUrl === undefined ? undefined : DatabaseUrl.parse(rawDatabaseUrl);

let findCartById: FindCartById;
let storeCartEvent: StoreCartEvent;
let findProductById: FindProductById;
let storeProductEvent: StoreProductEvent;

if (databaseUrl === undefined) {
  // secondary adapters (memory)
  const cartRepository = CartRepositoryOnMemory.create();
  const productRepository = ProductRepositoryOnMemory.create();
  findCartById = cartRepository.findById;
  storeCartEvent = cartRepository.store;
  findProductById = productRepository.findById;
  storeProductEvent = productRepository.store;
} else {
  // secondary adapters (rdb)
  const db = Db.getInstance(databaseUrl);
  findCartById = CartRepositoryOnRdb.createFindByIdFn(db);
  storeCartEvent = StoreCartEventOnRdb.createStoreFn(db);
  findProductById = ProductRepositoryOnRdb.createFindByIdFn(db);
  storeProductEvent = StoreProductEventOnRdb.createStoreFn(db);
}

// use cases (management)
const registerProduct = RegisterProductUseCase.create(storeProductEvent);

// use cases (shopping)
const getCart = GetCartUseCase.create(findCartById);
const addCartItem = AddCartItemUseCase.create(
  findProductById,
  findCartById,
  storeCartEvent,
);
const removeCartItem = RemoveCartItemUseCase.create(
  findCartById,
  storeCartEvent,
);
const clearCart = ClearCartUseCase.create(findCartById, storeCartEvent);

// primary adapters (management)
const registerProductHandler = RegisterProductHandler.create(registerProduct);

// primary adapters (shopping)
const getCartHandler = GetCartHandler.create(getCart);
const addCartItemHandler = AddCartItemHandler.create(addCartItem);
const removeCartItemHandler = RemoveCartItemHandler.create(removeCartItem);
const clearCartHandler = ClearCartHandler.create(clearCart);

export {
  registerProductHandler,
  getCartHandler,
  addCartItemHandler,
  removeCartItemHandler,
  clearCartHandler,
};
