{
  let message = 'hello'; // string型と推論されます
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  message = 10; // NG: string型と互換性のない型の値を再代入
  message = 'hi'; // OK: string型の別の値を再代入

  let anything; // 明確な初期値がないため、any型と推論されます
  // eslint-disable-next-line prefer-const
  anything = 42; // any型のsubsetである型を代入できますが、型は引き続きanyと推論されます

  console.log(message, anything);
}

{
  const pi = 3.14; // 型は3.14というリテラル型と推論されます
  const message = 'hello'; // 型は"hello"というリテラル型と推論されます
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  message = 'world'; // NG: 値の再代入

  console.log(pi, message);
}

{
  const employee = { name: 'John', age: 30 }; // 型は {name: string; age: number;} と推論されます
  employee.age = 31; // OK: オブジェクトのプロパティには再代入
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  employee = { name: 'Doe', age: 40 }; // NG: オブジェクト自体を再代入

  const grades = [1, 2, 3]; // numbersの型はnumber[]と推論されます
  grades.push(4); // OK: 配列の要素の追加
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  grades = [4, 5, 6]; // NG: 配列自体の再代入

  console.log(employee, grades);
}
