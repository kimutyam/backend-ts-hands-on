it('型注釈', () => {
  /* eslint-disable */
  let userName: string = 'John';
  let age: number = 24;
  let isActive: boolean = true;
  let job: undefined = undefined;
  let hobby: null = null;
  let uniqueId: symbol = Symbol('uniqueId');
  let userCode: bigint = 922337203685477000n;

  expect(typeof userName).toBe('string');
  expect(typeof age).toBe('number');
  expect(typeof isActive).toBe('boolean');
  expect(typeof job).toBe('undefined');
  expect(typeof hobby).toBe('object');
  expect(typeof uniqueId).toBe('symbol');
  expect(typeof userCode).toBe('bigint');
});

it('型注釈なし', () => {
  /* eslint-disable */
  let userName = 'John';
  let age = 24;
  let isActive = true;
  let job = undefined;
  let hobby = null;
  let uniqueId = Symbol('uniqueId');
  let userCode = 922337203685477000n;

  expect(typeof userName).toBe('string');
  expect(typeof age).toBe('number');
  expect(typeof isActive).toBe('boolean');
  expect(typeof job).toBe('undefined');
  expect(typeof hobby).toBe('object');
  expect(typeof uniqueId).toBe('symbol');
  expect(typeof userCode).toBe('bigint');
});

it('const', () => {
  /* eslint-disable */
  const userName = 'John';
  const age = 24;
  const isActive = true;
  const job = undefined;
  const hobby = null;
  const uniqueId = Symbol('id');
  const largeNumber = 9007199254740991n;

  expect(typeof userName).toBe('string');
  expect(typeof age).toBe('number');
  expect(typeof isActive).toBe('boolean');
  expect(typeof job).toBe('undefined');
  expect(typeof hobby).toBe('object');
  expect(typeof uniqueId).toBe('symbol');
  expect(typeof largeNumber).toBe('bigint');
});

interface Value {
  foo: number;
  bar: number;
}

type PartialValue = Partial<Value>;
type V = Required<PartialValue>;
type A = Omit<V, 'foo'>;
