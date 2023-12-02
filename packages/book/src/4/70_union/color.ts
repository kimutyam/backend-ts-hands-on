export const Color = {
  RED: 'Red',
  YELLOW: 'Yellow',
  BLUE: 'Blue',
} as const;

export type Color = (typeof Color)[keyof typeof Color];

export const AllColor = Object.values(Color);

// type Color = {
//   readonly Red: "Red";
//   readonly Yellow: "Yellow";
//   readonly Blue: "Blue";
// }
export type ColorType = typeof Color;
