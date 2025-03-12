const response = '{ "id": 1, "name": "Alice" }';
const user = JSON.parse(response) as {
  id: number;
  name: string;
};

console.log(user);
