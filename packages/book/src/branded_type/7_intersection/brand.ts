declare class BrandTag<S extends symbol> {
  private readonly _tag: S;
}

export type Brand<T, S extends symbol> = T & BrandTag<S>;
