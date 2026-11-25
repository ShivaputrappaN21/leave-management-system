package com.edutech.controller;

import java.util.List;
import java.util.Map;

import com.edutech.exception.UserException;
import com.edutech.model.LeaveType;
import com.edutech.service.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leave-types")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveTypeController {

    @Autowired private LeaveTypeService service;

    @PostMapping
    public ResponseEntity<LeaveType> create(@RequestBody LeaveType body) throws UserException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @GetMapping
    public List<LeaveType> read() { return service.findAll(); }

    @GetMapping("/{id}")
    public LeaveType readOne(@PathVariable Integer id) throws UserException { return service.find(id); }

    @PutMapping("/{id}")
    public LeaveType update(@PathVariable Integer id, @RequestBody LeaveType body) throws UserException {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) throws UserException {
        service.delete(id);
        return Map.of("id", id, "message", "LeaveType deleted successfully");
    }
}
