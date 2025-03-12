let message = 'hello'; // 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
message = 10; // 2
message = 'hi'; // 3

let anything; // 4

// eslint-disable-next-line prefer-const
anything = 42; // 5

console.log(message, anything);
