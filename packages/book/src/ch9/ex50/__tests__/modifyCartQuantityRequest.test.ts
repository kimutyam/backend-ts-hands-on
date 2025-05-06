import assert from 'node:assert';

import type { CartItem } from 'ch9/ex50/cartItem.js';
import { ModifyCartQuantityRequest } from 'ch9/ex50/modifyCartQuantityRequest.js';
import { Price } from 'ch9/ex50/price.js';
import * as R from 'remeda';

it('構造の異なる入力値からカート項目を組み立てる', () => {
  const data: unknown = {
    customerId: '01JTJ0MG3X8FD7PESQSP7TJBXM',
    productId: '01JMVNZTTTV8T0PC0GK7FBKFPD',
    quantity: 1,
  };
  const result = ModifyCartQuantityRequest.schema.safeParse(data);
  assert(result.success);

  const cartItem: CartItem = R.pipe(
    result.data,
    ModifyCartQuantityRequest.toCartItem(Price.parse(100)),
  );

  expect(cartItem.productId).toBe('01JMVNZTTTV8T0PC0GK7FBKFPD');
  expect(cartItem.price).toBe(100);
  expect(cartItem.quantity).toBe(1);
});
