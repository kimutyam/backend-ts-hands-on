{
  // eslint-disable-next-line prefer-const
  let anything: any = 'this is a string'; // any型と型注釈をいれている
  // eslint-disable-next-line prefer-const
  let strLength: number = (anything as string).length; // someValueはstring型であるコンパイラに伝える

  console.log(anything, strLength);
}

{
  // eslint-disable-next-line prefer-const
  let message = 'hello' as const; // "hello" の文字列リテラル型として評価されます。
  console.log(message);
}

{
  const employee = { name: 'John', age: 30 } as const; // { readonly name: "John", readonly age: 30 }と推論される
  const grades = [1, 2, 3] as const; // readonly [1, 2, 3]

  console.log(employee, grades);
}
