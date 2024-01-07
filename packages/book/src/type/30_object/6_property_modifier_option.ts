export interface Profile {
  name: string;
  age: number;
  job?: string;
  industry?: string;
}

export const profile: Profile = { name: 'John', age: 24, job: 'Engineer' };

// .形式で呼び出せる
console.log(
  profile.name, // John
  profile.age, // 24
  profile.job, // Engineer
  profile.industry, // undefined
);
