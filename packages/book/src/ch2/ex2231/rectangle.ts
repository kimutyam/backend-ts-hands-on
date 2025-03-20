class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}
}

const r1: Rectangle = new Rectangle(1, 2);
const r2: Rectangle = { width: 3, height: 4 }; // 1

const isRectangle = (rectangle: Rectangle): boolean =>
  rectangle instanceof Rectangle;

isRectangle(r1); // 2
isRectangle(r2); // 3

export { Rectangle };
