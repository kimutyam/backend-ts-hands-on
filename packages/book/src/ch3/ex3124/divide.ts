import assert from 'node:assert';

const divide = (a: number, b: number): number => {
  const divided = a / b;
  assert(Number.isFinite(divided), '結果が整数になるようにしてください');
  return divided;
};

export { divide };
