export type ProductId = string;

export type Product = Readonly<{
  productId: ProductId;
  name: string;
  price: number;
}>;
