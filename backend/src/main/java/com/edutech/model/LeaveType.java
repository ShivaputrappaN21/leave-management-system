package com.edutech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** POJO / JPA entity: private variables, public getters, setters, constructors and toString(). */
@Entity
@Table(name = "leave_type")
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_type_id")
    private Integer leaveTypeId;

    @Column(name = "type_code", nullable = false, unique = true, length = 10)
    private String typeCode;

    @Column(name = "type_name", nullable = false, length = 50)
    private String typeName;

    @Column(name = "max_days_per_year", nullable = false)
    private int maxDaysPerYear;

    @Column(name = "is_paid", nullable = false)
    private boolean paid;

    public LeaveType() { }

    public LeaveType(Integer leaveTypeId, String typeCode, String typeName, int maxDaysPerYear, boolean paid) {
        this.leaveTypeId = leaveTypeId;
        this.typeCode = typeCode;
        this.typeName = typeName;
        this.maxDaysPerYear = maxDaysPerYear;
        this.paid = paid;
    }

    public Integer getLeaveTypeId() { return leaveTypeId; }
    public void setLeaveTypeId(Integer leaveTypeId) { this.leaveTypeId = leaveTypeId; }

    public String getTypeCode() { return typeCode; }
    public void setTypeCode(String typeCode) { this.typeCode = typeCode; }

    public String getTypeName() { return typeName; }
    public void setTypeName(String typeName) { this.typeName = typeName; }

    public int getMaxDaysPerYear() { return maxDaysPerYear; }
    public void setMaxDaysPerYear(int maxDaysPerYear) { this.maxDaysPerYear = maxDaysPerYear; }

    public boolean isPaid() { return paid; }
    public void setPaid(boolean paid) { this.paid = paid; }

    @Override
    public String toString() {
        return "LeaveType{" +
               "leaveTypeId=" + leaveTypeId +
               ", typeCode=" + typeCode +
               ", typeName=" + typeName +
               ", maxDaysPerYear=" + maxDaysPerYear +
               ", paid=" + paid +
               "}";
    }
}
