let message = 'hello'; // 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
message = 10; // 2
message = 'hi'; // 3

console.log(message);
