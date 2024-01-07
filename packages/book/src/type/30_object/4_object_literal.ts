// 少々型定義の返り値の定義が面倒であり、視認性が低い
export function buildProfile(name: string, age: number): { name: string; age: number } {
  return { name, age };
}
