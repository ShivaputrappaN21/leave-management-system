package com.edutech.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.edutech.repository.EmployeeRepository;
import com.edutech.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private LeaveRequestRepository requestRepo;

    public Map<String, Object> summary() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("totalEmployees", employeeRepo.count());
        m.put("pendingRequests", requestRepo.countByStatus("PENDING"));
        m.put("approvedRequests", requestRepo.countByStatus("APPROVED"));
        m.put("onLeaveToday", requestRepo.countOnLeave(LocalDate.now()));
        List<Map<String, Object>> dept = new ArrayList<>();
        for (Object[] row : requestRepo.approvedDaysByDepartment()) {
            Map<String, Object> d = new LinkedHashMap<>();
            d.put("department", row[0]);
            d.put("days", ((Number) row[1]).longValue());
            dept.add(d);
        }
        m.put("daysByDepartment", dept);
        m.put("upcomingLeaves", requestRepo.findTop5ByFromDateGreaterThanEqualAndStatusInOrderByFromDateAsc(
                LocalDate.now(), List.of("PENDING", "APPROVED")));
        return m;
    }
}
