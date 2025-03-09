// See: https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping
export type Brand<T, Tag extends string> = {
  _tag: Tag;
  value: T;
};

export type AnyBrand = Brand<unknown, string>;
export type BrandValue<N extends AnyBrand> = N['value'];
