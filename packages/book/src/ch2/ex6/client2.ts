import type { Manager } from 'ch2/ex6/sample.js';
import { modifyName } from 'ch2/ex6/sample.js';

const manager: Manager = { name: '佐藤', age: 25, grade: 1 };
const modifiedManager: Manager = modifyName(manager, '田中');

console.log(modifiedManager);
