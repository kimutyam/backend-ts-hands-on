interface Person {
  name: string;
  age: number;
}

function modifyName(person: Person, name: string): Person {
  // eslint-disable-next-line no-param-reassign
  person.name = name;
  return person;
}

const person = {
  name: 'Alice',
  age: 10,
};

console.log(person); // { "name": "Alice", "age": 10 }

const updatedPerson = modifyName(person, 'Telles');

console.log(person); // { "name": "Telles", "age": 10 }
console.log(updatedPerson); // { "name": "Telles", "age": 10 }
