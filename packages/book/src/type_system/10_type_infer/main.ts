{
  let greeting = 'hello'; // string型と推論されます
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  greeting = 10; // NG: string型と互換性のない型の値を再代入
  greeting = 'hi'; // OK: string型の別の値を再代入

  let anything; // 明確な初期値がないため、any型と推論されます
  // eslint-disable-next-line prefer-const
  anything = 42; // any型のsubsetである型を代入できますが、型は引き続きanyと推論されます

  console.log(greeting, anything);
}

{
  const pi = 3.14; // 型は3.14というリテラル型と推論されます
  const greeting = 'hello'; // 型は'hello'というリテラル型と推論されます
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  greeting = 'world'; // NG: 値の再代入

  console.log(pi, greeting);
}

{
  const person = { name: 'John', age: 30 }; // 型は {name: string; age: number;} と推論されます
  person.age = 31; // OK: オブジェクトのプロパティには再代入
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  person = { name: 'Doe', age: 40 }; // NG: オブジェクト自体を再代入

  const numbers = [1, 2, 3]; // numbersの型はnumber[]と推論されます
  numbers.push(4); // OK: 配列の要素の追加
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  numbers = [4, 5, 6]; // NG: 配列自体の再代入

  console.log(person, numbers);
}
