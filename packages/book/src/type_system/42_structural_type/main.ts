interface Employee {
  name: string;
  age: number;
}

interface PartTime {
  name: string;
  age: number;
}

function modifyName(employee: Employee, name: string): Employee {
  return { ...employee, name };
}

{
  let employee: Employee = { name: 'Alice', age: 30 };
  const partTime: PartTime = { name: 'Bob', age: 25 };
  employee = partTime; // 構造の互換性があるため、エラーになりません
  modifyName(employee, 'Charlie'); // 関数シグニチャではPerson型を期待していますが、Employee型を渡してもエラーになりません
  console.log(employee);
}

export type { Employee, PartTime };
