export interface Profile {
  name: string;
  readonly age: number;
}

const profile: Profile = { name: 'John', age: 24 };
profile.name = 'John Titor'; // 変更できる
// profile.age = 25; // 変更できない

// .形式で呼び出せる
console.log(
  profile.name, // John
  profile.age, // 24
);
