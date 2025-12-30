const value: unknown = 'Hello';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
value.toUpperCase(); // 1

if (typeof value === 'string') {
  value.toUpperCase(); // 2
}
