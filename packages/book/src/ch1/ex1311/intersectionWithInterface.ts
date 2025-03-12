import type { Executive, Manager } from 'ch1/ex1221/employee.js';

interface ManagerIntersectionExecutive extends Manager, Executive {}

declare function ManagerIntersectionExecutive(): ManagerIntersectionExecutive;
const managerIntersectionExecutive = ManagerIntersectionExecutive();
managerIntersectionExecutive.name = '木村'; // OK
managerIntersectionExecutive.age = 32; // OK
managerIntersectionExecutive.grade = 3; // OK
managerIntersectionExecutive.title = 'CTO'; // OK

export type { ManagerIntersectionExecutive };
