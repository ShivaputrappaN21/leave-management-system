package com.edutech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** POJO / JPA entity: private variables, public getters, setters, constructors and toString(). */
@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Integer deptId;

    @Column(name = "dept_code", nullable = false, unique = true, length = 10)
    private String deptCode;

    @Column(name = "dept_name", nullable = false, length = 60)
    private String deptName;

    @Column(name = "location", length = 60)
    private String location;

    @Column(name = "head_name", length = 60)
    private String headName;

    public Department() { }

    public Department(Integer deptId, String deptCode, String deptName, String location, String headName) {
        this.deptId = deptId;
        this.deptCode = deptCode;
        this.deptName = deptName;
        this.location = location;
        this.headName = headName;
    }

    public Integer getDeptId() { return deptId; }
    public void setDeptId(Integer deptId) { this.deptId = deptId; }

    public String getDeptCode() { return deptCode; }
    public void setDeptCode(String deptCode) { this.deptCode = deptCode; }

    public String getDeptName() { return deptName; }
    public void setDeptName(String deptName) { this.deptName = deptName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getHeadName() { return headName; }
    public void setHeadName(String headName) { this.headName = headName; }

    @Override
    public String toString() {
        return "Department{" +
               "deptId=" + deptId +
               ", deptCode=" + deptCode +
               ", deptName=" + deptName +
               ", location=" + location +
               ", headName=" + headName +
               "}";
    }
}
