package com.edutech.service;

import java.util.List;

import com.edutech.exception.UserException;
import com.edutech.model.Department;
import com.edutech.repository.DepartmentRepository;
import com.edutech.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    @Autowired private DepartmentRepository repo;
    @Autowired private EmployeeRepository employeeRepo;

    public List<Department> findAll() { return repo.findAll(); }

    public Department find(Integer id) throws UserException {
        return repo.findById(id).orElseThrow(() -> new UserException("Department " + id + " not found", 404));
    }

    private void validate(Department d) throws UserException {
        if (d.getDeptCode() == null || d.getDeptCode().isBlank() || d.getDeptCode().length() > 10)
            throw new UserException("Department code is required (max 10 characters)");
        if (d.getDeptName() == null || d.getDeptName().isBlank() || d.getDeptName().length() > 60)
            throw new UserException("Department name is required (max 60 characters)");
        d.setDeptCode(d.getDeptCode().trim().toUpperCase());
    }

    public Department create(Department d) throws UserException {
        validate(d);
        if (repo.existsByDeptCode(d.getDeptCode()))
            throw new UserException("Department code " + d.getDeptCode() + " already exists", 409);
        d.setDeptId(null);
        return repo.save(d);
    }

    public Department update(Integer id, Department d) throws UserException {
        Department old = find(id);
        validate(d);
        if (repo.existsByDeptCodeAndDeptIdNot(d.getDeptCode(), id))
            throw new UserException("Department code " + d.getDeptCode() + " already exists", 409);
        old.setDeptCode(d.getDeptCode());
        old.setDeptName(d.getDeptName());
        old.setLocation(d.getLocation());
        old.setHeadName(d.getHeadName());
        return repo.save(old);
    }

    public void delete(Integer id) throws UserException {
        find(id);
        if (employeeRepo.existsByDepartment_DeptId(id))
            throw new UserException("Department has employees; move or remove them before deleting", 409);
        repo.deleteById(id);
    }
}
