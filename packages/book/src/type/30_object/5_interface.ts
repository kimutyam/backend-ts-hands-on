// 型定義
interface Profile {
  name: string;
  age: number;
}

export function buildProfile1(name: string, age: number): Profile {
  return { name, age };
}

// Type Aliasでもネストできる
export interface User {
  id: number;
  isActive: boolean;
  profile: Profile;
}

// jobは存在しないのでエラーになる
// const profile: Profile = {
//   name: 'John',
//   age: 24,
//   job: 10
// }
