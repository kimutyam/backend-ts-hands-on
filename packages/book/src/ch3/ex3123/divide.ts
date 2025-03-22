const divide = (a: number, b: number): number => {
  console.assert(b !== 0, '0で割ることはできません');
  return a / b;
};

export { divide };
