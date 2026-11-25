package com.edutech.controller;

import java.util.Map;

import com.edutech.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    @Autowired private DashboardService service;

    @GetMapping
    public Map<String, Object> summary() { return service.summary(); }
}
