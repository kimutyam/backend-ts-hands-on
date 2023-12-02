export type Invalid = { status: 'invalid' };

// なぜここだけObject.freezeしているのか？
export const Invalid: Invalid = Object.freeze({
  status: 'invalid',
});

export type Suspended<T> = { status: 'suspended'; value: T };
export const Suspended = <T>(value: T): Suspended<T> => ({ status: 'suspended', value });

export type Ok<T> = { status: 'valid'; value: T };
export const Ok = <T>(value: T): Ok<T> => ({ status: 'valid', value });

export type Status<T = any> = Ok<T> | Suspended<T> | Invalid;
