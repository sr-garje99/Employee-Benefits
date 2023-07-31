package com.backend.app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.Company;
import com.backend.app.entities.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
	
	List<Employee> findByCompany(Company company);
	Optional<Employee> findByEmployeeEmail(String employeeEmail);
	Employee findByEmployeeEmailAndEmployeePassword(String employeeEmail,String employeePassword);

}
