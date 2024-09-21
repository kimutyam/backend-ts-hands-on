{
  // eslint-disable-next-line prefer-const
  let anything: any = 'this is a string'; // 型主張の説明のためにany型の注釈を入れています
  // eslint-disable-next-line prefer-const
  let strLength: number = (anything as string).length; // string型に上書きして、lengthプロパティを利用しています

  console.log(anything, strLength);
}

{
  // eslint-disable-next-line prefer-const
  let message = 'hello' as const; // 'hello' の文字列リテラル型として評価されます
  console.log(message);
}

{
  const employee = { name: '木村', age: 30 } as const; // { readonly name: '木村', readonly age: 30 }と推論されます
  const grades = [1, 2, 3] as const; // readonly [1, 2, 3] と推論されます

  console.log(employee, grades);
}
