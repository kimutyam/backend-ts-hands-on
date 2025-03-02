class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}
}

const r1: Rectangle = new Rectangle(1, 2);
const r2: Rectangle = { width: 3, height: 4 };

// true, false
console.log(
  r1 instanceof Rectangle,
  r2 instanceof Rectangle,
);

export { r1, r2 };
