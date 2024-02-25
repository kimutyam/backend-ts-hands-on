import { z } from 'zod';
import type { OrderItem } from '../16_domain_zod_neverthrow/orderItem';
import { OrderQuantity } from '../16_domain_zod_neverthrow/orderQuantity';
import type { Price } from '../16_domain_zod_neverthrow/product/price';
import { ProductId } from '../16_domain_zod_neverthrow/product/productId';

// 価格が存在しない
const schema = z
  .object({
    id: ProductId.schema,
    // 値オブジェクトの制約よりも強い入力制限をするユースケースを想定
    quantity: z.number().int().min(1).max(2),
  })
  .readonly();

export type OrderQuantityDto = z.infer<typeof schema>;

const toOrderItem =
  (price: Price) =>
  ({ id, quantity }: OrderQuantityDto): OrderItem => ({
    product: {
      id,
      price,
    },
    // 値オブジェクトの制約を満たすことが自明であるため、safeBuildでなくて、buildを利用
    quantity: OrderQuantity.build(quantity),
  });

export const OrderQuantityDto = {
  schema,
  toOrderItem,
} as const;
