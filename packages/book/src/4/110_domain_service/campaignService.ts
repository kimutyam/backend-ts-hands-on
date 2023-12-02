import type { Product } from '../90_entity_id/product';
import { ProductId } from '../90_entity_id/productId';
import type { DiscountCondition } from './discountCondition';
import type { DiscountedProduct } from './discountedProduct';

const discount = (
  product: Product,
  conditions: ReadonlyArray<DiscountCondition>,
): DiscountedProduct => {
  const condition = conditions.find((c) => ProductId.equals(c.productId, product.id));
  // TODO: 存在しないとエラーにする
  if (condition) {
    const discountedPrice = Math.floor(product.price * ((100 - condition.rate) / 100));
    if (discountedPrice <= 100) {
      throw new Error('hogehoge');
    }
    if (discountedPrice >= product.price) {
      throw new Error('aaa');
    }
    return { ...product, discountedPrice };
  }
  return product;
};

// 上の例を改善しよう。
// 例外は型制約に含めたい -> Price型とRate型を定義し、Priceにdiscount関数を持たせる
// 100円未満になる場合は、通常価格を適用したい -> try catchでもいいけどdiscount関数で結果型が渡るようにしたい
// Result型を実装する
// Price#discountの修正
// Transformが欲しい..
// Price#discountの再修正
// ドメインサービスの修正

// Transformは他の値オブジェクトに使えるよ.. (ex. バリデーション)
// Invariantsはバリデーションと一緒に使えばいいよ。

// こんなことをせずにdiscount関数として渡せばいいけど..
export const CampaignService = {
  discount,
} as const;
