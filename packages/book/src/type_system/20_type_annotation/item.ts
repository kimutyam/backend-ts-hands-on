interface Item {
  itemId: string;
  price: number;
}

const item: Item = {
  itemId: 'Item-Id-A',
  price: 1_000,
}; // 定義済みのオブジェクトの型を明示化します

console.log(item);
