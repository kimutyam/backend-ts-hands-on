import { recursiveFn } from 'ch3/ex3111/recursiveFn.js';

try {
  recursiveFn();
} catch (e) {
  console.error(e);
}

console.log('catch句で回復しているため、到達する');

export { recursiveFn };
