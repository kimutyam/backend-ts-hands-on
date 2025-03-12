const value: unknown = 'Hello';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
value.toUpperCase(); // 1

if (typeof value === 'string') {
  value.toUpperCase(); // 2
}
