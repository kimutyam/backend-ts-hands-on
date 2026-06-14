export interface Invalid {
  status: 'invalid';
}

// なぜここだけObject.freezeしているのか？
export const Invalid: Invalid = Object.freeze({
  status: 'invalid',
});

export interface Suspended<T> {
  status: 'suspended';
  value: T;
}
export const Suspended = <T>(value: T): Suspended<T> => ({ status: 'suspended', value });

export interface Ok<T> {
  status: 'valid';
  value: T;
}
export const Ok = <T>(value: T): Ok<T> => ({ status: 'valid', value });

export type Status<T = any> = Ok<T> | Suspended<T> | Invalid;
