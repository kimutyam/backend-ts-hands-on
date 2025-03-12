const employee = { name: '木村', age: 30 }; // 1
employee.age = 31; // 2
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
employee = { name: '佐藤', age: 40 }; // 3

const grades = [1, 2, 3]; // 4
grades.push(4); // 5
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
grades = [4, 5, 6]; // 6

console.log(employee, grades);
