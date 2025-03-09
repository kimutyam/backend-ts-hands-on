const CustomIdBrand = Symbol.for('CustomIdBrand');

type CustomerId = number & {
  readonly [CustomIdBrand]: unknown;
};

const build = (value: number): CustomerId => value as CustomerId;

export { type CustomerId, build };
