// 言語仕様を説明する
export interface Box<T> {
  value: T;
}

export const stringBox: Box<string> = {
  value: 'foo',
};

export const numberBox: Box<number> = {
  value: 10,
};
