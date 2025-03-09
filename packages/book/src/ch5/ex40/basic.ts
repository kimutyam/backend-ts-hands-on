import { z } from 'zod';

// JavaScript Primitive Schemas
// ZodString型
z.string();
// ZodNumber型
z.number();
// ZodBigInt型
z.bigint();
// ZodBoolean型
z.boolean();
// ZodNull型
z.null();
// ZodUndefined型
z.undefined();
// ZodSymbol型
z.symbol();

// Complex Schemas
// ZodObject型
z.object({});
// ZodDate型
z.date();
// ZodRecord型
z.record(z.number());
// ZodArray型
z.array(z.string());
// ZodTuple型
z.tuple([z.string(), z.number()]);
// ZodEnum型
z.enum(['foo', 'bar']);
// ZodUnion型
z.union([z.string(), z.number()]);
// ZodIntersection型
z.intersection(z.object({ name: z.string() }), z.object({ price: z.number() }));

// Others...
// ZodAny型
z.any();
// ZodUnknown型
z.unknown();
// ZodVoid型
z.void();
// ZodLiteral型
z.literal('bar');
// ZodFunction型
z.function();
