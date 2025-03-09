import { z } from 'zod';

// JavaScript Primitive Schemas
z.string(); // ZodString型
z.number(); // ZodNumber型
z.bigint(); // ZodBigInt型
z.boolean(); // ZodBoolean型
z.null(); // ZodNull型
z.undefined(); // ZodUndefined型
z.symbol(); // ZodSymbol型

// Complex Schemas
z.object({}); // ZodObject型
z.date(); // ZodDate型
z.record(z.number()); // ZodRecord型
z.array(z.string()); // ZodArray型
z.tuple([z.string(), z.number()]); // ZodTuple型
z.enum(['foo', 'bar']); // ZodEnum型
z.union([z.string(), z.number()]); // ZodUnion型
z.intersection(
  z.object({ name: z.string() }),
  z.object({ price: z.number() }),
); // ZodIntersection型

// Others...
z.any(); // ZodAny型
z.unknown(); // ZodUnknown型
z.void(); // ZodVoid型
z.literal('bar'); // ZodLiteral型
z.function(); // ZodFunction型
