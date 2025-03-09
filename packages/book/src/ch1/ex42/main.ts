interface Employee {
  name: string;
  age: number;
}

interface PartTime {
  name: string;
  age: number;
}

const modifyName = (employee: Employee, name: string): Employee => ({
  ...employee,
  name,
});

{
  let employee: Employee = { name: '木村', age: 30 };
  const partTime: PartTime = { name: '佐藤', age: 25 };
  // 構造の互換性があるため、エラーになりません
  employee = partTime;
  // 関数シグニチャではPerson型を期待していますが、Employee型を渡してもエラーになりません
  modifyName(employee, '鈴木');
  console.log(employee);
}

export type { Employee, PartTime };
