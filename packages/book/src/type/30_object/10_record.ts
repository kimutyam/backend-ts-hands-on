// インデックス型のユーティリティ
// Type Alias...
export type FavoriteTech = Record<string, string>;
export const favoriteTech: FavoriteTech = { language: 'TypeScript', db: 'PostgreSQL' };

// value[prop]形式で呼び出せる
console.log(
  favoriteTech['language'], // TypeScript
  favoriteTech['db'], // PostgreSQL
  favoriteTech['IaC'], // undefined
);
