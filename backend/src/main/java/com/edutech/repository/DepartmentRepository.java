package com.edutech.repository;

import com.edutech.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    boolean existsByDeptCode(String deptCode);
    boolean existsByDeptCodeAndDeptIdNot(String deptCode, Integer deptId);
}
