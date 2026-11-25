package com.edutech.repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import com.edutech.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {

    /** Active (PENDING / APPROVED) requests of the same employee whose dates clash with the given range. */
    @Query("select r from LeaveRequest r where r.employee.empNo = :emp "
         + "and r.status in ('PENDING','APPROVED') and r.requestId <> :excludeId "
         + "and r.fromDate <= :toDate and r.toDate >= :fromDate")
    List<LeaveRequest> findOverlaps(@Param("emp") Integer emp, @Param("fromDate") LocalDate fromDate,
                                    @Param("toDate") LocalDate toDate, @Param("excludeId") Integer excludeId);

    List<LeaveRequest> findByStatus(String status);
    List<LeaveRequest> findByEmployee_EmpNo(Integer empNo);
    boolean existsByEmployee_EmpNo(Integer empNo);
    boolean existsByLeaveType_LeaveTypeId(Integer leaveTypeId);
    long countByStatus(String status);

    @Query("select count(r) from LeaveRequest r where r.status = 'APPROVED' and r.fromDate <= :d and r.toDate >= :d")
    long countOnLeave(@Param("d") LocalDate d);

    @Query("select r.employee.department.deptName, sum(r.days) from LeaveRequest r "
         + "where r.status = 'APPROVED' group by r.employee.department.deptName")
    List<Object[]> approvedDaysByDepartment();

    List<LeaveRequest> findTop5ByFromDateGreaterThanEqualAndStatusInOrderByFromDateAsc(LocalDate d, Collection<String> statuses);
}
