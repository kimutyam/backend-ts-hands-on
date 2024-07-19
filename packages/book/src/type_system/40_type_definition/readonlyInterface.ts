interface Person {
  readonly name: string;
  readonly age: number;
}

function modifyName(person: Person, name: string): Person {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  person.name = name; // NG: readonlyなので変更できない
  return person;
}

{
  const person = {
    name: 'Alice',
    age: 10,
  };
  modifyName(person, 'Telles');
}

export { type Person, modifyName };
