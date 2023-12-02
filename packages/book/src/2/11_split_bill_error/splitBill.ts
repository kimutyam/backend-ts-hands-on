export function splitBill(bill: number, members: number): number {
  if (members < 2) {
    throw new Error('2人以上を指定してください');
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new Error('割り切れません');
  }
  return calculated;
}
