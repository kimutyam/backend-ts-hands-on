import { Price } from '../../price/price';
import { ProductId } from '../../product/productId';
import { uniqueByProduct } from '../order';
import { OrderItem } from '../orderItem';
import { OrderQuantity } from '../orderQuantity';

it('uniqueByProduct', () => {
  const product1 = {
    productId: ProductId.generate(),
    name: 'product-1',
    price: Price.build(3_400),
  };

  const orderItem1 = OrderItem.build(product1, OrderQuantity.build(3));
  const orderItem2 = OrderItem.build(
    {
      productId: ProductId.generate(),
      name: 'product-2',
      price: Price.build(3_400),
    },
    OrderQuantity.build(1),
  );
  const orderItem3 = OrderItem.build(product1, OrderQuantity.build(1));
  const uniqueOrderItems = uniqueByProduct([orderItem1, orderItem2, orderItem3]);
  expect(uniqueOrderItems).toHaveLength(2);
});
