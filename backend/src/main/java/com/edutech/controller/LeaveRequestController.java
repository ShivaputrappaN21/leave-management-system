package com.edutech.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.edutech.exception.UserException;
import com.edutech.model.LeaveRequest;
import com.edutech.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leave-requests")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveRequestController {

    @Autowired private LeaveRequestService service;

    @PostMapping
    public ResponseEntity<LeaveRequest> create(@RequestBody LeaveRequest r) throws UserException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.apply(r));
    }

    @GetMapping
    public List<LeaveRequest> read(@RequestParam(required = false) String status,
                                   @RequestParam(required = false) Integer empNo) {
        return empNo != null ? service.findByEmployee(empNo) : service.findAll(status);
    }

    @GetMapping("/{id}")
    public LeaveRequest readOne(@PathVariable Integer id) throws UserException { return service.find(id); }

    @PutMapping("/{id}")
    public LeaveRequest update(@PathVariable Integer id, @RequestBody LeaveRequest r) throws UserException {
        return service.update(id, r);
    }

    @PutMapping("/{id}/approve")
    public LeaveRequest approve(@PathVariable Integer id) throws UserException { return service.approve(id); }

    @PutMapping("/{id}/reject")
    public LeaveRequest reject(@PathVariable Integer id) throws UserException { return service.reject(id); }

    /** DELETE = status based cancellation (record is kept for history). */
    @DeleteMapping("/{id}")
    public Map<String, Object> cancel(@PathVariable Integer id) throws UserException {
        LeaveRequest r = service.cancel(id);
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("requestId", r.getRequestId());
        m.put("status", r.getStatus());
        m.put("message", "Leave cancelled; " + r.getDays() + " day(s) restored to balance");
        return m;
    }
}
