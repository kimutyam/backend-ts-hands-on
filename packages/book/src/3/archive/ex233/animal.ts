// eslint-disable-next-line max-classes-per-file
class Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }

  bark(): void {
    console.log(`${this.name} barks.`);
  }
}

class GuideDog extends Dog {
  constructor(
    name: string,
    breed: string,
    public trainedFor: string,
  ) {
    super(name, breed);
  }

  guide(): void {
    console.log(`${this.name} is guiding for ${this.trainedFor}.`);
  }
}

export { Animal, Dog, GuideDog };
