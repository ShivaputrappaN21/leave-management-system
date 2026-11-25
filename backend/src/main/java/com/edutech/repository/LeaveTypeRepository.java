package com.edutech.repository;

import com.edutech.model.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveTypeRepository extends JpaRepository<LeaveType, Integer> {
    boolean existsByTypeCode(String typeCode);
    boolean existsByTypeCodeAndLeaveTypeIdNot(String typeCode, Integer id);
}
