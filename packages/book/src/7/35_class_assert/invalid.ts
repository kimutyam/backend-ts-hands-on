import assert from 'assert';
import { OrderItem } from './orderItem';
import { OrderQuantity } from './orderQuantity';

/* eslint max-classes-per-file:0 */

// OrderQuantityクラスと形状が同じ
class NumberContainer {
  constructor(public value: number) {}
}

// OrderQuantityクラスと形状が同じ
// リスコフの置換原則違反
export class SpecialOrderQuantity extends OrderQuantity {
  constructor(value: number) {
    super(value);
    assert(value !== 5, 'このサブクラスでは5個の注文は許可されません。');
  }
}

OrderItem.add(new OrderQuantity(10));
OrderItem.add(new NumberContainer(10));
OrderItem.add(new SpecialOrderQuantity(5));
OrderItem.add({ value: -10 });
