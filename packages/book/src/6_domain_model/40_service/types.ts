/** 注文 */
export interface Order {
  readonly orderId: string;
  readonly items: ReadonlyArray<{
    readonly productId: string;
    readonly quantity: number;
  }>;
}

/** 商品在庫 */
export interface ProductStock {
  readonly productId: string;
  readonly stock: number;
}

export type Stocks = ReadonlyArray<ProductStock>;
