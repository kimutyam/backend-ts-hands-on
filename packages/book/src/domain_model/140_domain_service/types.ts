/** 商品在庫 */
export type ProductStock = {
  productId: string;
  stock: number;
};

/** 商品 */
export type Product = {
  productId: string;
  price: number;
};

/** 品目 */
export type Item = {
  product: Product;
  quantity: number;
};

/** 注文 */
export type Order = {
  orderId: string;
  orderItems: ReadonlyArray<Item>;
};
