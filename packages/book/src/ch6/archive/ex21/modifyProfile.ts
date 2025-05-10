import { Employee } from 'ch6/archive/ex21/employee.js';
import * as R from 'remeda';

declare function findEmployee(employeeNumber: number): Promise<Employee>;
declare function storeEmployee(employee: Employee): Promise<void>;

const modifyProfile = async (
  employeeNumber: number,
  telephone: string,
): Promise<void> => {
  const employee = await findEmployee(employeeNumber);
  // 電話番号の形式が正しいか検証は必要か？
  const changed = R.pipe(employee, Employee.changeTelephone(telephone));
  await storeEmployee(changed);
};

export { modifyProfile };
