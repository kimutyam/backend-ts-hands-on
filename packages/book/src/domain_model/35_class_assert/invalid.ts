import assert from 'assert';
import { Item } from 'domain_model/35_class_assert/item.js';
import { Quantity } from 'domain_model/35_class_assert/quantity.js';

/* eslint max-classes-per-file:0 */

// Quantityクラスと形状が同じ
class NumberContainer {
  constructor(public value: number) {}
}

// Quantityクラスと形状が同じ
// リスコフの置換原則違反
export class SpecialQuantity extends Quantity {
  constructor(value: number) {
    super(value);
    assert(value !== 5, 'このサブクラスでは5個の注文は許可されません。');
  }
}

Item.add(new Quantity(10));
Item.add(new NumberContainer(10));
Item.add(new SpecialQuantity(5));
Item.add({ value: -10 });
