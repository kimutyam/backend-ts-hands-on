import type { Manager } from './sample.js';
import { modifyName } from './sample.js';

const manager: Manager = { name: '佐藤', age: 25, grade: 1 };
const modifiedManager: Manager = modifyName(manager, '田中');

console.log(modifiedManager);
