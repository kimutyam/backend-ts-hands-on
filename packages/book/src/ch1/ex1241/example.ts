let value: never;

// NG: 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
value = 10;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
value = 'hello';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
value = true;

console.log(value);
