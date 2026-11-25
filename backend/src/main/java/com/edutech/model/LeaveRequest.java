package com.edutech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** POJO / JPA entity: private variables, public getters, setters, constructors and toString(). */
@Entity
@Table(name = "leave_request")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "emp_no", nullable = false)
    private Employee employee;

    @ManyToOne(optional = false)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @Column(name = "days", nullable = false)
    private int days;

    @Column(name = "reason", length = 200)
    private String reason;

    @Column(name = "status", nullable = false, length = 10)
    private String status;

    @Column(name = "applied_date", nullable = false)
    private LocalDate appliedDate;

    public LeaveRequest() { }

    public LeaveRequest(Integer requestId, Employee employee, LeaveType leaveType, LocalDate fromDate, LocalDate toDate, int days, String reason, String status, LocalDate appliedDate) {
        this.requestId = requestId;
        this.employee = employee;
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.days = days;
        this.reason = reason;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    public Integer getRequestId() { return requestId; }
    public void setRequestId(Integer requestId) { this.requestId = requestId; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }

    @Override
    public String toString() {
        return "LeaveRequest{" +
               "requestId=" + requestId +
               ", employee=" + employee +
               ", leaveType=" + leaveType +
               ", fromDate=" + fromDate +
               ", toDate=" + toDate +
               ", days=" + days +
               ", reason=" + reason +
               ", status=" + status +
               ", appliedDate=" + appliedDate +
               "}";
    }
}
