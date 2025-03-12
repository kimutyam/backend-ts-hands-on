// eslint-disable-next-line prefer-const, @typescript-eslint/no-inferrable-types
let message: string = 'hello'; // 1

const add = (x: number, y: number): number => x + y; // 1

console.log(message, add(10, 20));
