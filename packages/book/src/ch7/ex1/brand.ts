const BrandTypeId: unique symbol = Symbol.for(
  'something/Brand',
);

interface Brand<ID extends string | symbol> {
  readonly [BrandTypeId]: {
    readonly [id in ID]: ID;
  };
}

export type { Brand };
