let value: unknown;

// NG: 型が保証されていないためプロパティにはアクセスできません
// value.toUpperCase();

// 型チェックを行います
if (typeof value === 'string') {
  value.toUpperCase(); // OK
}
