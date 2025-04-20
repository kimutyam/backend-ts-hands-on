import type { Brand } from 'ch6/ex6217/brand.js';

type CustomerId = number & Brand<'CustomerId'>;
type Age = number & Brand<'Age'>;

export type { CustomerId, Age };
