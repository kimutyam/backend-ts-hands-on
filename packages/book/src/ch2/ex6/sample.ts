interface Employee {
  readonly name: string;
  readonly age: number;
}

interface Manager {
  readonly name: string;
  readonly age: number;
  readonly grade: number;
}

const modifyName = <T extends Employee>(employee: T, name: string): T => ({
  ...employee,
  name,
});

export { type Manager, type Employee, modifyName };
