package com.backend.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.Dependent;
import com.backend.app.entities.Employee;

public interface DependentRepo extends JpaRepository<Dependent, Integer> {
	
	List<Dependent> findByEmployee(Employee employee);

}
