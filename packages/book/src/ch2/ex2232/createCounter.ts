const createCounter = () => {
  let count = 0;
  return {
    // eslint-disable-next-line no-plusplus
    increment: () => ++count,
  };
};

const counter = createCounter();
console.log(counter.increment());
console.log(counter.increment());
