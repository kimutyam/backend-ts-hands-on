{
  // eslint-disable-next-line prefer-const
  let someValue: any = 'this is a string'; // any型と型注釈をいれている
  // eslint-disable-next-line prefer-const
  let strLength: number = (someValue as string).length; // someValueはstring型であるコンパイラに伝える

  console.log(someValue, strLength);
}

{
  // eslint-disable-next-line prefer-const
  let greeting = 'hello' as const; // "hello" の文字列リテラル型として評価されます。
  console.log(greeting);
}

{
  const person = { name: 'John', age: 30 } as const; // { readonly name: "John", readonly age: 30 }と推論される
  const numbers = [1, 2, 3] as const; // readonly [1, 2, 3]

  console.log(person, numbers);
}
