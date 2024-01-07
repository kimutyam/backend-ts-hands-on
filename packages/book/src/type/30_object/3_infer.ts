// 型注釈をやめると、TypeScriptで型推論してくれる。
export const userProfile = {
  name: 'John',
  age: 24,
}; // {name: string, age: number}

console.log(userProfile.name); // John

// ネストしていてもok
export const user = {
  id: 1,
  isActive: true,
  profile: {
    name: 'John',
    age: 24,
  },
}; // { id: number, isActive: boolean, profile: {name: string, age: number}};

console.log(user.profile.age); // 24

console.log(user['profile']);
// エラーになる
// console.log(user['hoge']);
