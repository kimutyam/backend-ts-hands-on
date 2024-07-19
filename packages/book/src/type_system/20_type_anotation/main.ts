{
  // eslint-disable-next-line @typescript-eslint/prefer-as-const, prefer-const
  let greeting: 'hello' = 'hello'; // 型注釈をしなければ、string型と推論される
  const pi = 3.14; // 型注釈をしなければ、数値リテラル型の3.14と推論される

  console.log(greeting, pi);
}

{
  // 数値、文字列、またはブール値に初期化された変数またはパラメーターの明示的な型宣言を禁止します。
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types, prefer-const
  let greeting: string = 'hello'; // 型注釈をしなければ、string型と推論される
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const pi: number = 3.14; // 型注釈をしなければ、数値リテラル型の3.14と推論される

  console.log(greeting, pi);
}

{
  let anything: number; // 型注釈をしなければ、any型と推論される
  anything = 10;
  anything = 20;

  console.log(anything);
}
