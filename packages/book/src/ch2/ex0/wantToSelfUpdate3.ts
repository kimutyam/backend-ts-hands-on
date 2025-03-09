// ジェネリクスを使って汎化していると、うまくいく
interface Employee {
  readonly name: string;
  readonly age: number;
  readonly update: <T extends Employee>(target: T, props: Partial<T>) => T;
}

interface Manager extends Employee {
  readonly grade: number;
}

// そもそもオブジェクト定義のときに振る舞いも用意する必要があり、冗長になる
const employee: Employee = {
  name: '木村',
  age: 20,
  update: <T extends Employee>(target: T, props: Partial<T>): T => ({
    ...target,
    ...props,
  }),
};

const manager: Manager = {
  name: '佐藤',
  age: 20,
  grade: 1,
  // 同じ関数を実装している
  update: <T extends Employee>(target: T, props: Partial<T>): T => ({
    ...target,
    ...props,
  }),
};

employee.update(employee, { age: 30 }); // { name: '木村', age: 30 }
manager.update(manager, { grade: 2 }); // { name: '佐藤', age: 20, grade: 2 }

export type { Employee, Manager };
