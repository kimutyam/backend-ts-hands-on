const response = '{ "id": 1, "name": "木村" }';
const user: unknown = JSON.parse(response); // 1

// 2
if (typeof user === 'object' && user !== null && 'name' in user) {
  console.log(user.name);
}
