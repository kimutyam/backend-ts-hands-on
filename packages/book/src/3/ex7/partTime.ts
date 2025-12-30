interface PartTime {
  name: string;
  age: number;
  workHours: number;
}

type ReadonlyPartTime = Readonly<PartTime>;
type Employee = Pick<PartTime, 'name' | 'age'>;

export type { ReadonlyPartTime, PartTime, Employee };
