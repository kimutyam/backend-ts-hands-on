type Person = {
  name: string;
  age: number;
};

type Student = Person & { grade: number };

export type { Person, Student };
