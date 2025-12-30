let value: never;

// NG: 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
value = 10;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
value = 'hello';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
value = true;

console.log(value);
