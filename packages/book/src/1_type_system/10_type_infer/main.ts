{
  // number型と推論されます
  // eslint-disable-next-line prefer-const
  let count = 10;
  // number 型の戻り値と推論されます
  const double = (x: number) => x * 2;

  console.log(count, double(count));
}

{
  // string型と推論されます
  let message = 'hello';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // NG: string型と互換性のない型の値を再代入
  message = 10;
  // OK: string型の別の値を再代入
  message = 'hi';

  // 明確な初期値がないため、any型と推論されます
  let anything;

  // あらゆる型の値を代入できますが、型アノテーションをしない限り any のままです
  // eslint-disable-next-line prefer-const
  anything = 42;

  console.log(message, anything);
}

{
  const pi = 3.14; // 型は3.14というリテラル型と推論されます
  const message = 'hello'; // 型は'hello'というリテラル型と推論されます
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  message = 'world'; // NG: 値の再代入

  console.log(pi, message);
}

{
  // 型は {name: string; age: number;} と推論されます
  const employee = { name: '木村', age: 30 };
  employee.age = 31; // OK: オブジェクトのプロパティには再代入
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // NG: オブジェクト自体を再代入
  employee = { name: '佐藤', age: 40 };

  const grades = [1, 2, 3]; // numbersの型はnumber[]と推論されます
  grades.push(4); // OK: 配列の要素の追加
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  grades = [4, 5, 6]; // NG: 配列自体の再代入

  console.log(employee, grades);
}
