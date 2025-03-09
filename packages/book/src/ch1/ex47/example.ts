const response = '{ "name": "木村", "age": 25 }';
const user: unknown = JSON.parse(response);

if (
  typeof user === 'object' &&
  user !== null &&
  'name' in user
) {
  console.log(user.name);
}
