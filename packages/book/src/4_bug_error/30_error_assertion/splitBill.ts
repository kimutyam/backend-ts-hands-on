import assert from 'node:assert';

const splitBill = (bill: number, members: number): number => {
  assert(bill > 0, '勘定は0円以上にしてください');
  assert(members >= 2, '2人以上を指定してください');
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new Error('割り切れません');
  }
  assert(calculated > 0, '割った結果が0より大きい');
  assert(Number.isFinite(calculated), '計算結果が有限数ではありません');
  return calculated;
};

export { splitBill };
