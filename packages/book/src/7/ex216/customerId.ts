const CustomIdBrand = Symbol.for('CustomIdBrand');

type CustomerId = number & {
  readonly [CustomIdBrand]: unknown;
};

const valueOf = (value: number): CustomerId => value as CustomerId;

export { valueOf, type CustomerId };
