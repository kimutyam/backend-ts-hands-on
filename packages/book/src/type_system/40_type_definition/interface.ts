interface Person {
  name: string;
  age: number;
}

{
  // eslint-disable-next-line prefer-const
  let person: Person = {
    name: 'Alice',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    age: 'Secret', // NG: number型でない
  };
  console.log(person);
}

interface Student extends Person {
  grade: number;
}

export type { Person, Student };
