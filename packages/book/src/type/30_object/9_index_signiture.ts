// インデックスシグニチャ
// 型プロパティのことを全て知っていない場合がある
export interface FavoriteTech {
  [key: string]: string;
}

export const favoriteTech: FavoriteTech = { language: 'TypeScript', db: 'PostgreSQL' };

// value[prop]形式で呼び出せる
console.log(
  favoriteTech['language'], // TypeScript
  favoriteTech['IaC'], // undefined
);
