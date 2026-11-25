package com.edutech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** POJO / JPA entity: private variables, public getters, setters, constructors and toString(). */
@Entity
@Table(name = "leave_balance", uniqueConstraints = @UniqueConstraint(name = "uk_balance", columnNames = {"emp_no", "leave_type_id", "leave_year"}))
public class LeaveBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "balance_id")
    private Integer balanceId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "emp_no", nullable = false)
    private Employee employee;

    @ManyToOne(optional = false)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    @Column(name = "leave_year", nullable = false)
    private int year;

    @Column(name = "allotted_days", nullable = false)
    private int allottedDays;

    @Column(name = "used_days", nullable = false)
    private int usedDays;

    public LeaveBalance() { }

    public LeaveBalance(Integer balanceId, Employee employee, LeaveType leaveType, int year, int allottedDays, int usedDays) {
        this.balanceId = balanceId;
        this.employee = employee;
        this.leaveType = leaveType;
        this.year = year;
        this.allottedDays = allottedDays;
        this.usedDays = usedDays;
    }

    public Integer getBalanceId() { return balanceId; }
    public void setBalanceId(Integer balanceId) { this.balanceId = balanceId; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public int getAllottedDays() { return allottedDays; }
    public void setAllottedDays(int allottedDays) { this.allottedDays = allottedDays; }

    public int getUsedDays() { return usedDays; }
    public void setUsedDays(int usedDays) { this.usedDays = usedDays; }

    @Override
    public String toString() {
        return "LeaveBalance{" +
               "balanceId=" + balanceId +
               ", employee=" + employee +
               ", leaveType=" + leaveType +
               ", year=" + year +
               ", allottedDays=" + allottedDays +
               ", usedDays=" + usedDays +
               "}";
    }
}
