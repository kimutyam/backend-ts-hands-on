const fetchEmployeeName = async (): Promise<string> => {
  const res = await fetch('https://api.example.com/employees/1');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const employee: { name: string; age: number } = await res.json();
  return employee.name.toUpperCase();
};

export { fetchEmployeeName };
