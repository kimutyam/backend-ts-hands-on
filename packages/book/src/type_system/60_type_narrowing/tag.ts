interface ShapeLike<T extends string> {
  kind: T;
}

interface Square extends ShapeLike<'square'> {
  size: number;
}

interface Rectangle extends ShapeLike<'rectangle'> {
  width: number;
  height: number;
}

interface Circle extends ShapeLike<'circle'> {
  radius: number;
}

// tagged union 直和
type Shape = Square | Rectangle | Circle;

const assertNever = (x: never): never => {
  throw new Error(`${x} is Unexpected value. Should have been never.`);
};

const calculatorArea = (shape: Shape): number => {
  switch (shape.kind) {
    case 'square':
      return shape.size * shape.size;
    case 'rectangle':
      return shape.width * shape.height;
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    default:
      return assertNever(shape);
  }
};

const mySquare: Square = { kind: 'square', size: 10 };
console.log(calculatorArea(mySquare)); // 出力: 100
