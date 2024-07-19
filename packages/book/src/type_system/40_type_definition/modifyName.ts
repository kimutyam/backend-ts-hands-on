import type { Person } from './interface';

function modifyName(person: Person, name: string): Person {
  return { ...person, name };
}

export { modifyName };
