import assert from 'node:assert';
import { Failure, Success } from '../result';
import { Invariants } from './invariants';
import type { InvariantsError } from './invariantsError';
import type { NominalResult } from './nominalResult';

export type Nominal<Name extends string, T> = Readonly<{
  name: Name;
  value: T;
}>;

export type AnyNominal = Nominal<string, unknown>;
export type NominalName<N extends AnyNominal> = N['name'];
export type NominalValue<N extends AnyNominal> = N['value'];
export type NNominal<N extends AnyNominal> = Nominal<NominalName<N>, NominalValue<N>>;

type ModifyFn<N extends AnyNominal> = (a: NominalValue<N>) => NominalValue<N>;

const safeModify =
  <N extends AnyNominal>(f: ModifyFn<N>, invariants: Invariants<N>) =>
  (n: N): NominalResult<N> => {
    const value = f(n.value);
    const errors = Invariants.validate(value)(invariants);
    return errors ? Failure(errors) : Success({ ...n, value });
  };

const modify =
  <N extends AnyNominal>(f: ModifyFn<N>, invariants: Invariants<N>) =>
  (n: N): N => {
    const value = f(n.value);
    let error: InvariantsError<N> | undefined;
    assert((error = Invariants.validate(value)(invariants)) === undefined, error?.message);
    return { ...n, value };
  };
export const Nominal = {
  modify,
  safeModify,
} as const;
