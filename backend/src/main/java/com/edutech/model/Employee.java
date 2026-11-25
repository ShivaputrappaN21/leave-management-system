package com.edutech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** POJO / JPA entity: private variables, public getters, setters, constructors and toString(). */
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_no")
    private Integer empNo;

    @Column(name = "name", nullable = false, length = 60)
    private String name;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "salary", nullable = false, precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "status", nullable = false, length = 10)
    private String status;

    @ManyToOne(optional = false)
    @JoinColumn(name = "dept_id", nullable = false)
    private Department department;

    public Employee() { }

    public Employee(Integer empNo, String name, int age, String gender, String email, BigDecimal salary, LocalDate joinDate, String status, Department department) {
        this.empNo = empNo;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.salary = salary;
        this.joinDate = joinDate;
        this.status = status;
        this.department = department;
    }

    public Integer getEmpNo() { return empNo; }
    public void setEmpNo(Integer empNo) { this.empNo = empNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    @Override
    public String toString() {
        return "Employee{" +
               "empNo=" + empNo +
               ", name=" + name +
               ", age=" + age +
               ", gender=" + gender +
               ", email=" + email +
               ", salary=" + salary +
               ", joinDate=" + joinDate +
               ", status=" + status +
               ", department=" + department +
               "}";
    }
}
