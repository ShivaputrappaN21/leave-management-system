package com.edutech.repository;

import java.util.List;
import java.util.Optional;

import com.edutech.model.LeaveBalance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Integer> {
    List<LeaveBalance> findByEmployee_EmpNo(Integer empNo);
    Optional<LeaveBalance> findByEmployee_EmpNoAndLeaveType_LeaveTypeIdAndYear(Integer empNo, Integer leaveTypeId, int year);
    boolean existsByLeaveType_LeaveTypeId(Integer leaveTypeId);
    boolean existsByEmployee_EmpNo(Integer empNo);
}
