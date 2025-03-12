// { readonly name: '木村', readonly age: 30 }と推論されます
const employee = { name: '木村', age: 30 } as const; // 1
// readonly [1, 2, 3] と推論されます
const grades = [1, 2, 3] as const; // 2

console.log(employee, grades);
