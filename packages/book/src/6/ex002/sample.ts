import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

const parseEmployee = (
  json: unknown,
): Result<{ name: string; age: number }, ReadonlyArray<string>> => {
  const errors: Array<string> = [];

  if (typeof json !== 'object' || json === null) {
    errors.push('入力はオブジェクトである必要があります');
    return err(errors);
  }

  let name: string | undefined;
  if (!('name' in json) || typeof json.name !== 'string') {
    errors.push('name は文字列である必要があります');
  } else if (json.name.length < 3) {
    errors.push('name は3文字以上である必要があります');
  } else {
    name = json.name;
  }

  let age: number | undefined;
  if (!('age' in json) || typeof json.age !== 'number') {
    errors.push('age は数値である必要があります');
  } else if (json.age < 20) {
    errors.push('age は20以上である必要があります');
  } else {
    age = json.age;
  }

  return errors.length > 0 ? err(errors) : ok({ name: name!, age: age! });
};

const fetchEmployeeName = (): ResultAsync<string, ReadonlyArray<string>> =>
  ResultAsync.fromSafePromise(fetch('https://api.example.com/employees/1'))
    .map((res) => res.json())
    .andThen(parseEmployee)
    .map((employee) => employee.name.toUpperCase());

export { fetchEmployeeName };
