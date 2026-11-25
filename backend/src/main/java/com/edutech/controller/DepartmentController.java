package com.edutech.controller;

import java.util.List;
import java.util.Map;

import com.edutech.exception.UserException;
import com.edutech.model.Department;
import com.edutech.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:4200")
public class DepartmentController {

    @Autowired private DepartmentService service;

    @PostMapping
    public ResponseEntity<Department> create(@RequestBody Department body) throws UserException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @GetMapping
    public List<Department> read() { return service.findAll(); }

    @GetMapping("/{id}")
    public Department readOne(@PathVariable Integer id) throws UserException { return service.find(id); }

    @PutMapping("/{id}")
    public Department update(@PathVariable Integer id, @RequestBody Department body) throws UserException {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) throws UserException {
        service.delete(id);
        return Map.of("id", id, "message", "Department deleted successfully");
    }
}
