import { Product } from 'domain_model/80_entity/product.js';

it('価格を変更しても、同一の商品とみなす', () => {
  const baseProduct = {
    productId: 'base',
    name: 'apple',
    price: 100,
  };
  const changedProduct = Product.changePrice(200)(baseProduct);

  expect(baseProduct.price).toBe(100);
  expect(changedProduct.price).toBe(200);
  expect(Product.isSameIdentity(baseProduct, changedProduct)).toBeTruthy();
});
