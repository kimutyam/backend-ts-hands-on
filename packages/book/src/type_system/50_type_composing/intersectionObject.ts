import type { Executive, Manager } from '../44_subtype/employee';

// {name: string, age: number, grade: number, title: number}型になります
type ManagerIntersectionExecutive = Manager & Executive;

declare function ManagerIntersectionExecutive(): ManagerIntersectionExecutive;
const managerIntersectionExecutive = ManagerIntersectionExecutive();
managerIntersectionExecutive.name = 'Bob'; // OK
managerIntersectionExecutive.age = 32; // OK
managerIntersectionExecutive.grade = 3; // OK
managerIntersectionExecutive.title = 'CTO'; // OK
