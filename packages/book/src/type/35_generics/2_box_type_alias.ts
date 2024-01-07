import type { Box } from './1_box';

// Type Aliasを使っても同等
type StringBox = Box<string>;
export const stringBox1: StringBox = {
  value: 'foo',
};
