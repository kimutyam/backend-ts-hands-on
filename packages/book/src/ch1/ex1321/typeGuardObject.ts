const isObject = (value: unknown) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const debugNarrowing = (value: object | null | Array<number>): void => {
  if (isObject(value)) {
    console.log('object (excluding null and Array)');
  } else if (value === null) {
    console.log('null');
  } else {
    console.log('Array');
  }
};

export { debugNarrowing };
