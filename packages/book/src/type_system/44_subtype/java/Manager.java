// Employeeの部分型です
class Manager extends Employee {
  int grade;

  public Manager(String name, int age, int grade) {
    super(name, age);
    this.grade = grade;
  }
}
