/** 注文 */
interface Order {
  readonly orderId: string;
  readonly items: ReadonlyArray<{
    readonly productId: string;
    readonly quantity: number;
  }>;
}

/** 商品在庫 */
interface ProductStock {
  readonly productId: string;
  readonly stock: number;
}

type Stocks = ReadonlyArray<ProductStock>;

export type { Order, ProductStock, Stocks };
