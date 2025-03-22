import assert from 'node:assert';

const divide = (a: number, b: number): number => {
  const divided = a / b;
  assert(Number.isFinite(divided), '整数で指定ください'); // 事後条件
  return divided;
};

export { divide };
