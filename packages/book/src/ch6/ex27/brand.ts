const BrandTypeId: unique symbol =
  Symbol.for('effect/Brand');

interface Brand<in out K extends string | symbol> {
  readonly [BrandTypeId]: {
    readonly [k in K]: K;
  };
}

export type { Brand };
