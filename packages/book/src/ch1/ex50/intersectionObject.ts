import type { Executive, Manager } from 'ch1/ex44/employee.js';

// {name: string, age: number, grade: number, title: number}型になります
type ManagerExecutiveIntersection = Manager & Executive;

declare function ManagerExecutiveIntersection(): ManagerExecutiveIntersection;
const managerExecutiveIntersection = ManagerExecutiveIntersection();
managerExecutiveIntersection.name = '木村'; // OK
managerExecutiveIntersection.age = 32; // OK
managerExecutiveIntersection.grade = 3; // OK
managerExecutiveIntersection.title = 'CTO'; // OK
