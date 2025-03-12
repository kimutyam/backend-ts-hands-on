const response = JSON.parse('{ "name": "Alice" }') as {
  name: string;
  age: number;
};
console.log(response.age.toFixed(2)); // ❌ 実行時エラー: `age` は存在しない
