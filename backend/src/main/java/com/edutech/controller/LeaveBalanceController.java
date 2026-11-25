package com.edutech.controller;

import java.util.List;
import java.util.Map;

import com.edutech.exception.UserException;
import com.edutech.model.LeaveBalance;
import com.edutech.service.LeaveBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leave-balances")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveBalanceController {

    @Autowired private LeaveBalanceService service;

    @PostMapping
    public ResponseEntity<LeaveBalance> create(@RequestBody LeaveBalance body) throws UserException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @GetMapping
    public List<LeaveBalance> read() { return service.findAll(); }

    @GetMapping("/{id}")
    public LeaveBalance readOne(@PathVariable Integer id) throws UserException { return service.find(id); }

    @PutMapping("/{id}")
    public LeaveBalance update(@PathVariable Integer id, @RequestBody LeaveBalance body) throws UserException {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) throws UserException {
        service.delete(id);
        return Map.of("id", id, "message", "LeaveBalance deleted successfully");
    }
}
