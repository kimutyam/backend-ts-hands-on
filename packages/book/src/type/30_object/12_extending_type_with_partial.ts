export interface BusinessProfile {
  job: string;
  industry: string;
}

export interface BasicProfile {
  name: string;
  age: number;
}

// 同一のプロパティ名があれば、TSエラー
interface Profile extends BasicProfile, Partial<BusinessProfile> {}

export const profile: Profile = { name: 'John', age: 24, job: 'Engineer' };

// .形式で呼び出せる
console.log(
  profile.name, // John
  profile.age, // 24
  profile.job, // Engineer
  profile.industry, // undefined
);
