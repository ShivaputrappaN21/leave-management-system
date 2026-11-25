package com.edutech.repository;

import java.util.List;

import com.edutech.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByNameContainingIgnoreCase(String name);   // search
    boolean existsByEmail(String email);
    boolean existsByEmailAndEmpNoNot(String email, Integer empNo);
    boolean existsByDepartment_DeptId(Integer deptId);
    long countByStatus(String status);
}
