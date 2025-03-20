class Counter {
  private count = 0;

  increment(): number {
    // eslint-disable-next-line no-plusplus
    this.count++;
    return this.count;
  }
}

const counter = new Counter();
console.log(counter.increment());
console.log(counter.increment());
