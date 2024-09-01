public class Main {
  public static void main(String[] args) {
    Employee employee = new Employee("Alice", 30);
    PartTime partTime = new PartTime("Bob", 25);

    employee = partTime; // 名前の互換性があるため、エラーになります
    System.out.println("Employee: " + employee.name + ", Age: " + employee.age);
    System.out.println("PartTime: " + partTime.name + ", Age: " + partTime.age);
  }
}
