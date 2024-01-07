const stringArray: Array<string> = ['one', 'two', 'three'];
export const numberArray: Array<number> = [1, 2, 3];

export const stringReadonlyArray: ReadonlyArray<string> = ['one', 'two', 'three'];
export const numberReadonlyArray: ReadonlyArray<number> = [1, 2, 3];

stringArray.pop();
// 破壊的な変更はできない
// stringReadonlyArray.pop()

// 公式のパクリ
// タプル型は、配列型の別の種類で、含まれる要素の数と、特定の位置にどの型が含まれるかを正確に認識します。
type StringNumberPair = [string, number];

export const a: StringNumberPair = ['one', 1];
// const hoge = a[0];

// booleanをanyに代入可能、、booleanはanyのサブタイプ
const c: any = true;
console.log(c);

// この辺のサブタイプの説明は後続でしっかりやることとする
export const foo: object = [1, 2, 3];
export const bar: Array<string | number> = [1, 'aaa'];
