// eslint-disable-next-line prefer-const
let anything: any = 'this is a string'; // 1
// eslint-disable-next-line prefer-const
let strLength: number = (anything as string).length; // 2

console.log(anything, strLength);
