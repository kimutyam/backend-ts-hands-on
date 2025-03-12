const pi = 3.14; // 1
const message = 'hello'; // 2
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
message = 'world'; // 3

console.log(pi, message);
