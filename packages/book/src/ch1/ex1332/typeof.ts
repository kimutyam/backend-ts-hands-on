const employee = {
  name: '木村',
  age: 20,
};

type Employee = typeof employee; // 1

export { type Employee, employee };
