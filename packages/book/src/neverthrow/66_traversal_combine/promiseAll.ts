const p1: Array<Promise<number>> = [Promise.resolve(1), Promise.resolve(2)];

const p2: Promise<Array<number>> = Promise.all(p1);

const p3: Promise<number> = p2.then((arr) => arr.reduce((acc, ele) => acc + ele, 0));

// eslint-disable-next-line prefer-promise-reject-errors
const p4: Array<Promise<number>> = [Promise.resolve(1), Promise.reject('Ohh!'), Promise.resolve(2)];

const p5: Promise<Array<number>> = Promise.all(p4);

setTimeout(() => {
  // Promise { <state>: "fulfilled", <value>: Array[2] }
  console.log(p2);
  // Promise { <state>: "fulfilled", <value>: 3 }
  console.log(p3);
  // Promise { <state>: "rejected", <reason>: Ohh! }
  console.log(p5);
});
