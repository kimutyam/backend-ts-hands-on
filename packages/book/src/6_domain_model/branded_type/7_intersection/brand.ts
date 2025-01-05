declare class BrandTag<S extends string> {
  private readonly _tag: S;
}

export type Brand<T, S extends string> = T & BrandTag<S>;
