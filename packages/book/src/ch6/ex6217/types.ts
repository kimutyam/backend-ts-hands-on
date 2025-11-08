import type { Brand } from './brand.js';

type CustomerId = number & Brand<'CustomerId'>;
type Age = number & Brand<'Age'>;

export type { CustomerId, Age };
