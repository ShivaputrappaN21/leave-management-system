package com.edutech.controller;

import java.util.List;
import java.util.Map;

import com.edutech.exception.UserException;
import com.edutech.model.Employee;
import com.edutech.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    @Autowired private EmployeeService service;

    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody Employee e) throws UserException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(e));
    }

    @GetMapping
    public List<Employee> read() { return service.findAll(); }

    @GetMapping("/search")
    public List<Employee> search(@RequestParam(defaultValue = "") String name) { return service.search(name); }

    @GetMapping("/{id}")
    public Employee readOne(@PathVariable Integer id) throws UserException { return service.find(id); }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Integer id, @RequestBody Employee e) throws UserException {
        Employee saved = service.update(id, e);
        return Map.of("empNo", saved.getEmpNo(), "salary", saved.getSalary(), "message", "Employee updated successfully");
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) throws UserException {
        service.delete(id);
        return Map.of("id", id, "message", "Employee deleted successfully");
    }
}
