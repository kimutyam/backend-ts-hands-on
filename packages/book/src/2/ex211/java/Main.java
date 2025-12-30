public class Main {
  public static void main(String[] args) {
    Employee employee = new Employee("木村", 30);
    PartTime partTime = new PartTime("佐藤", 25);

    employee = partTime; // 1
    System.out.println("Employee: " + employee.name + ", Age: " + employee.age);
    System.out.println("PartTime: " + partTime.name + ", Age: " + partTime.age);
  }
}
