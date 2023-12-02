import assert from 'assert';
import { pipe } from 'remeda';
import { Builder } from '../builder';
import { Generator } from '../generator';
import { InvariantUnit, Invariants } from '../invariants';
import { Nominal } from '../nominal';
import { SafeBuilder } from '../safeBuilder';

describe('公証型', () => {
  const name = 'DummyNominal';
  type DummyNominal = Nominal<typeof name, string>;
  const buildInvariantUnit = InvariantUnit<DummyNominal>;
  const invariants = Invariants.build<DummyNominal>(
    name,
    buildInvariantUnit((value) => value.length >= 3, 'Dummy should be at least 3 characters.'),
    buildInvariantUnit((value) => value.slice(0, 1) === 'b', 'Dummy should start with b.'),
  );

  const saleBuilder = SafeBuilder<DummyNominal>(name, invariants);
  const builder = Builder<DummyNominal>(name, invariants);
  const generator = Generator<DummyNominal>(name, invariants)(() => 'bonbonbon');

  it('build', () => {
    const value = 'bar';
    const dummy = builder.build(value);
    expect(dummy.name).toBe(name);
    expect(dummy.value).toBe(value);
  });

  it('saleBuild', () => {
    const value = 'bar';
    const dummyResult = saleBuilder.safeBuild(value);
    assert(dummyResult.success);
    expect(dummyResult.data.name).toBe(name);
    expect(dummyResult.data.value).toBe(value);
  });

  it('saleBuild error', () => {
    const value = 'b';
    const dummyResult = saleBuilder.safeBuild(value);
    assert(!dummyResult.success);
    expect(dummyResult.error.issues).toHaveLength(1);
    expect(dummyResult.error.name).toBe('InvariantsError');
    expect(dummyResult.error.issues[0]).toBe('Dummy should be at least 3 characters.');
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
    expect(modified.error.name).toBe('InvariantsError');
    expect(modified.error.issues).toHaveLength(1);
    expect(modified.error.issues).toEqual(
      expect.arrayContaining(['Dummy should be at least 3 characters.']),
    );
  });
});
