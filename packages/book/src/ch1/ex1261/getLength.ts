const getLength = (value: string | number): number =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  value.length; // 1 ❌ TypeScript エラー: number に `.length` は存在しない

export { getLength };
