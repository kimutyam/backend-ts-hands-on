// import { z } from 'zod';
//
// const schema = z.string(); // z.ZodString型
// type ZodString = z.infer<typeof schema>; // string
// console.log(schema.parse('foo')); // foo
//
// const zodType = z.number().brand('OrderQuantity');
//
// type RawType = z.input<typeof zodType>; // number
// type OrderQuantity = z.infer<typeof zodType>; // number & z.BRAND<"OrderQuantity">
//
// const build = (a: RawType): OrderQuantity => zodType.parse(a);
//
// export const b: z.ZodBranded<z.ZodNumber, number> = z.number().brand('OrderQuantity');
//
// const foo = (bb: z.ZodBranded<z.ZodNumber, number>): void => {
//   console.log(bb);
// };
//
// foo(a);
