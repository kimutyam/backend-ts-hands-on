{
  let greeting = 'hello'; // string型と推論される
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  greeting = 10; // NG: string型と互換性のない型を再代入はすることはできない
  greeting = 'hi'; // OK: string型の別の値を再代入が可能

  let anything; // any型と推論される（明確な初期値がないため）
  // eslint-disable-next-line prefer-const
  anything = 42; // any型のsubsetである型を代入できるが、型はanyのまま

  console.log(greeting, anything);
}

{
  const pi = 3.14; // piの型は3.14というリテラル型と推論される
  const greeting = 'hello'; // greetingの型は"hello"というリテラル型と推論される
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  greeting = 'world'; // NG: "hello" 以外は許容しない

  console.log(pi, greeting);
}

{
  const person = { name: 'John', age: 30 }; // personの型は{name: string; age: number;}と推論される
  person.age = 31; // 可能
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  person = { name: 'Doe', age: 40 }; // NG: 再代入はできない

  const numbers = [1, 2, 3]; // numbersの型はnumber[]と推論される
  numbers.push(4); // 可能
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  numbers = [4, 5, 6]; // NG: 再代入はできない

  console.log(person, numbers);
}
