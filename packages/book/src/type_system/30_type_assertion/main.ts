{
  // eslint-disable-next-line prefer-const
  let someValue: any = 'this is a string'; // 型主張の説明のためにany型の注釈を入れています
  // eslint-disable-next-line prefer-const
  let strLength: number = (someValue as string).length; // string型に上書きして、lengthプロパティを利用しています

  console.log(someValue, strLength);
}

{
  // eslint-disable-next-line prefer-const
  let greeting = 'hello' as const; // 'hello' の文字列リテラル型として評価されます
  console.log(greeting);
}

{
  const person = { name: 'John', age: 30 } as const; // { readonly name: 'John', readonly age: 30 }と推論されます
  const numbers = [1, 2, 3] as const; // readonly [1, 2, 3] と推論されます

  console.log(person, numbers);
}
