import assert from 'assert';
import { pipe } from 'remeda';
import { Builder } from '../builder';
import { Generator } from '../generator';
import { InvariantUnit, Invariants } from '../invariants';
import { Nominal } from '../nominal';
import { Transformer } from '../transformer';

describe('公証型', () => {
  const name = 'DummyNominal';
  type DummyNominal = Nominal<typeof name, string>;
  const buildInvariantUnit = InvariantUnit<DummyNominal>;
  const invariants = Invariants.buildMulti<DummyNominal>(
    name,
    buildInvariantUnit((value) => value.length >= 3, 'Dummy should be at least 3 characters.'),
    buildInvariantUnit((value) => value.slice(0, 1) === 'b', 'Dummy should start with b.'),
  );

  const transformer = Transformer<DummyNominal>(name, invariants);
  const builder = Builder<DummyNominal>(name, invariants);
  const generator = Generator<DummyNominal>(name, invariants)(() => 'bonbonbon');

  it('new', () => {
    const value = 'bar';
    const dummy = builder.build(value);
    expect(dummy.name).toBe(name);
    expect(dummy.value).toBe(value);
  });

  it('transform', () => {
    const value = 'bar';
    const dummyResult = transformer.transform(value);
    assert(dummyResult.success);
    expect(dummyResult.data.name).toBe(name);
    expect(dummyResult.data.value).toBe(value);
  });

  it('transform error', () => {
    const value = 'b';
    const dummyResult = transformer.transform(value);
    assert(!dummyResult.success);
    expect(dummyResult.error.descriptions).toHaveLength(1);
    expect(dummyResult.error.name).toBe('DummyNominal');
    expect(dummyResult.error.descriptions[0]).toBe('Dummy should be at least 3 characters.');
  });

  it('generate', () => {
    const generated = generator.generate();
    expect(generated.name).toBe(name);
    expect(generated.value).toBe('bonbonbon');
  });

  it('modify', () => {
    const modified = pipe(
      'bar',
      builder.build,
      Nominal.modify((v) => v + v, invariants),
    );
    expect(modified.value).toBe('barbar');
  });

  it('modify error', () => {
    const modified = pipe(
      'bar',
      builder.build,
      Nominal.safeModify((v) => v.slice(0, 1), invariants),
    );
    assert(!modified.success);
    expect(modified.error.name).toBe('DummyNominal');
    expect(modified.error.descriptions).toHaveLength(1);
    expect(modified.error.descriptions).toEqual(
      expect.arrayContaining(['Dummy should be at least 3 characters.']),
    );
  });
});
