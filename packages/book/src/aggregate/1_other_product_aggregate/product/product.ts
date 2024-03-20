import type { Eq } from '../eq';
import type { Price } from '../price/price';
import { ProductId } from './productId';

export type Product = Readonly<{
  productId: ProductId;
  name: string;
  price: Price;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  ProductId.equals(x.productId, y.productId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;

// type Input = ReadonlyArray<{
//   productId: string;
//   quantity: number;
// }>;

/**
 * 商品IDと、注文日時から商品価格を取得する
 * 商品価格群の数がProductIdsと一致しない場合はエラー
 * 商品価格群でLoop
 *  注文を生成。
 *    dueDate: 注文日時
 *    注文項目s (ProductId, 価格)
 *
 */
