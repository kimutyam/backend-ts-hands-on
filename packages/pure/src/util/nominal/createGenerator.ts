import type { Generator } from '#/util/generator.js';
import type { Nominal } from '#/util/nominal/nominal.js';

const generateNominal =
  <Name extends string>(name: Name) =>
  <T>(generator: () => T): Nominal<Name, T> =>
    ({ ...generator(), __name: name, __uniqueSymbol: Symbol(name) }) as Nominal<Name, T>;

export const createGenerator =
  <Name extends string>(name: Name) =>
  <S>(generator: () => S): Generator<Nominal<Name, S>> => ({
    generate: () => generateNominal(name)(generator),
  });
