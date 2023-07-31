package com.backend.app.services;

import java.util.List;
import java.util.Set;

import com.backend.app.entities.Plan;
import com.backend.app.payloads.EmployeeDto;
import com.backend.app.payloads.PlanDto;

public interface EmployeeService {
	
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	EmployeeDto registerEmployee(EmployeeDto employeeDto);
	EmployeeDto updateEmployee(EmployeeDto employeeDto,Integer employeeId,Integer companyId);
	EmployeeDto getEmployeeById(Integer employeeId);
	EmployeeDto login(EmployeeDto employeeDto);
	EmployeeDto addPlans(Integer planId,Integer employeeId);
	EmployeeDto unsubscribePlan(Integer employeeId,Integer planId);
	List<EmployeeDto> getAllEmployeeByCompanyId(Integer companyId);
	List<EmployeeDto> getAllEmployees();
	void deleteEmployee(Integer employeeId);

}
