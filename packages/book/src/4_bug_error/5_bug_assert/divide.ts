import assert from 'node:assert';

const divide = (a: number, b: number): number => {
  assert(b !== 0, '0で割ることはできません');
  return a / b;
};

export { divide };
