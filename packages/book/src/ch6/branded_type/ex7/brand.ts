interface BrandTag<S extends string> {
  readonly _tag: S;
}

export type Brand<T, S extends string> = T & BrandTag<S>;
