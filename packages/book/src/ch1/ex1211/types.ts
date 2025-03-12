interface Employee {
  name: string;
  age: number;
}

interface PartTime {
  // 1
  name: string;
  age: number;
}

let employee: Employee = { name: '木村', age: 30 };
const partTime: PartTime = { name: '佐藤', age: 25 };
// 構造の互換性があるため、エラーになりません
employee = partTime; // 2

console.log(employee);

export type { Employee, PartTime };
