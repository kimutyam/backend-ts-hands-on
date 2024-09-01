{
  // eslint-disable-next-line @typescript-eslint/prefer-as-const, prefer-const
  let message: 'hello' = 'hello'; // 型注釈を入れなければ、string型と推論されます
  console.log(message);
}

{
  // 数値、文字列、またはブール値に初期化された変数またはパラメーターの明示的な型宣言を禁止します。
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types, prefer-const
  let message: string = 'hello'; // 型注釈を使わなくてもstring型と推論されますが、明示的にstring型の注釈を入れています
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const pi: number = 3.14; // 型注釈をしなければ、数値リテラル型の3.14と推論されるところを、明示的にnumber型の注釈を入れています

  console.log(message, pi);
}

{
  let anything: number; // 型注釈を入れなければ、any型と推論されます
  anything = 10;
  anything = 20;

  console.log(anything);
}
