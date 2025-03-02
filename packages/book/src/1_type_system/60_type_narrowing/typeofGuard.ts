// ts5.5から型推論してくれるようになったから、型述語を明示しなくてよくなったよ。
const isString = (value: unknown) =>
  typeof value === 'string';

const print = (value: number | string): void => {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
};

export { print };
