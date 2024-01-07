// object typeはそれがオブジェクトであることしか表さない。
// せいぜい、nullでないことくらいしか分からない。
export const userProfile: object = {
  name: 'John',
  age: 24,
};

// TS2339: Property 'name' does not exist on type 'object'.
// userProfile.name
