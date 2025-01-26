import type { Executive, Manager } from '../44_subtype/employee.js';

// オブジェクトの型定義をinterfaceでする方法もあるが、型を組み合わせて型を作る場合はtypeを使う
interface ManagerIntersectionExecutive extends Manager, Executive {}

declare function ManagerIntersectionExecutive(): ManagerIntersectionExecutive;
const managerIntersectionExecutive = ManagerIntersectionExecutive();
managerIntersectionExecutive.name = '木村'; // OK
managerIntersectionExecutive.age = 32; // OK
managerIntersectionExecutive.grade = 3; // OK
managerIntersectionExecutive.title = 'CTO'; // OK

export type { ManagerIntersectionExecutive };
