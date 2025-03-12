import type { Employee, PartTime } from 'ch1/ex1211/types.js';

const modifyName = (employee: Employee, name: string): Employee => ({
  ...employee,
  name,
});

const partTime: PartTime = { name: '佐藤', age: 25 };

modifyName(partTime, '鈴木'); // エラーになりませんが、想定外の型が渡る可能性があります
