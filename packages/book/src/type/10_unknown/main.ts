export function doSomething(value: unknown) {
  if (typeof value === 'string') {
    console.log(
      value.toUpperCase(), // stringの関数
    );
  }
  if (value instanceof Error) {
    console.log(
      value.stack, // Errorオブジェクトのプロパティ
    );
  }
  if (Array.isArray(value)) {
    console.log(
      value.length, // Array型のプロパティ
    );
  }
}
