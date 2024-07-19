type PersonName = string;
interface Person {
  name: PersonName;
  age: number;
}

function modifyName(person: Person, name: PersonName): Person {
  return { ...person, name };
}

export { modifyName, type Person };
