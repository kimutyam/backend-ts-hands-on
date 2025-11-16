import { z } from 'zod';

z.string();
z.number();
z.bigint();
z.boolean();
z.null();
z.undefined();
z.symbol();

z.object({});
z.date();
z.record(z.string(), z.number());
z.array(z.string());
z.tuple([z.string(), z.number()]);
z.enum(['foo', 'bar']);
z.union([z.string(), z.number()]);
z.intersection(z.object({ name: z.string() }), z.object({ price: z.number() }));

z.any();
z.unknown();
z.void();
z.literal('bar');
z.function();
