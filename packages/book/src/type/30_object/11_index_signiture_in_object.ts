export interface Profile {
  name: string;
  age: number;
  [key: string]: string | number;
}

export const profile: Profile = { name: 'John', age: 24, job: 'Engineer' };

// value[prop]形式で呼び出せる
console.log(
  profile.name, // John
  profile.age, // 24
  profile['job'], // Engineer
  profile['industry'], // undefined
);
