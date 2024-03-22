import { Price } from '../../product/price';
import { ProductId } from '../../product/productId';
import { uniqueByProduct } from '../cart';
import { OrderQuantity } from '../orderQuantity';

it('uniqueByProduct', () => {
  const product1 = {
    productId: ProductId.generate(),
    name: 'product-1',
    price: Price.build(3_400),
  };

  const product2 = {
    productId: ProductId.generate(),
    name: 'product-2',
    price: Price.build(3_400),
  };

  const orderItem1 = { product: product1, quantity: OrderQuantity.build(3) };
  const orderItem2 = { product: product2, quantity: OrderQuantity.build(1) };
  const orderItem3 = { product: product1, quantity: OrderQuantity.build(1) };
  const uniqueOrderItems = uniqueByProduct({ orderItems: [orderItem1, orderItem2, orderItem3] });
  expect(uniqueOrderItems).toHaveLength(2);
});
