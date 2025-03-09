const isObject = (value: unknown) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const debugNarrowing = (value: object | null | Array<number>): void => {
  if (isObject(value)) {
    console.log('null及び配列以外のオブジェクトです。');
  } else if (value === null) {
    console.log('nullです。');
  } else {
    console.log('配列です。');
  }
};

export { debugNarrowing };
