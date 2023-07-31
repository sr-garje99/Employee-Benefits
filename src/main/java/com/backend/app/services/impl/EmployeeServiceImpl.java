package com.backend.app.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.app.config.AppConstants;
import com.backend.app.entities.Company;
import com.backend.app.entities.Employee;
import com.backend.app.entities.Plan;
import com.backend.app.entities.Role;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.payloads.EmployeeDto;
import com.backend.app.payloads.PlanDto;
import com.backend.app.repositories.CompanyRepo;
import com.backend.app.repositories.EmployeeRepo;
import com.backend.app.repositories.PlanRepo;
import com.backend.app.repositories.RoleRepo;
import com.backend.app.services.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CompanyRepo companyRepo;
	
	@Autowired
	private PlanRepo planRepo;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	@Autowired 
	private RoleRepo roleRepo;
	
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		
		//Company company = this.companyRepo.findById(companyId).orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		Employee employee = this.modelMapper.map(employeeDto, Employee.class);
		employee.setEmployeeEmail(employeeDto.getEmployeeEmail());
		employee.setBasicSalary(employeeDto.getBasicSalary());
		employee.setEmployeeName(employeeDto.getEmployeeName());
		employee.setEmployeeMobNo("0");
		employee.setEmployeePassword(employeeDto.getEmployeePassword());
		//employee.setCompany(company);
		
		Employee newEmployee = this.employeeRepo.save(employee);
		
		return this.modelMapper.map(newEmployee, EmployeeDto.class);
	}

	@Override
	public EmployeeDto updateEmployee(EmployeeDto employeeDto,Integer employeeId,Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId).orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
	
		employee.setEmployeeName(employeeDto.getEmployeeName());
		employee.setEmployeeEmail(employeeDto.getEmployeeEmail());
		employee.setBasicSalary(employeeDto.getBasicSalary());
		employee.setEmployeeMobNo(employeeDto.getEmployeeMobNo());
		employee.setEmployeePassword(employeeDto.getEmployeePassword());
		employee.setEmployeeAge(employeeDto.getEmployeeAge());
		employee.setCompany(company);
		
		Employee updatedEmployee = this.employeeRepo.save(employee);
		System.out.print("###################################"+updatedEmployee);
		return this.modelMapper.map(updatedEmployee, EmployeeDto.class);
	}

	@Override
	public EmployeeDto getEmployeeById(Integer employeeId) {
		
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		return this.modelMapper.map(employee, EmployeeDto.class);
	}

	@Override
	public List<EmployeeDto> getAllEmployeeByCompanyId(Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId).orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		List<Employee> employees = this.employeeRepo.findByCompany(company);
		
		List<EmployeeDto> employeeDtos = employees.stream().map((employee)-> this.modelMapper.map(employee,EmployeeDto.class)).collect(Collectors.toList());
		
		return employeeDtos;
	}

	@Override
	public void deleteEmployee(Integer employeeId) {
		
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		
		this.employeeRepo.delete(employee);
		
	}

	@Override
	public EmployeeDto login(EmployeeDto employeeDto) {
		
		
		Employee logInEmployee = this.employeeRepo.findByEmployeeEmailAndEmployeePassword(employeeDto.getEmployeeEmail(), employeeDto.getEmployeePassword());
				                // .orElseThrow(()-> new ResourceNotFoundException("Employee","employeeEmail",employeeDto.getEmployeeEmail()));
		
//		if(logInEmployee.getEmployeeId() == 0) {
//			return employeeDto;
//		}
		return this.modelMapper.map(logInEmployee, EmployeeDto.class);
		
		
		
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		
		List<Employee> employees = this.employeeRepo.findAll();
		
		List<EmployeeDto> employeeDtos = employees.stream().map((employee)-> this.modelMapper.map(employee,EmployeeDto.class)).collect(Collectors.toList());
		
		return employeeDtos;
	}

	@Override
	public EmployeeDto addPlans(Integer planId, Integer employeeId) {
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		Plan newPlan = this.planRepo.findById(planId)
				.orElseThrow(()-> new ResourceNotFoundException("Plan","planId",planId));
		
		Set<Plan> plan = employee.getPlan();
	    plan.add(newPlan);
		//.stream().map((plans)-> this.modelMapper.map(plans, Plan.class)).collect(Collectors.toList())
		employee.setPlan(plan);
		
		Employee updatedEmployee = this.employeeRepo.save(employee);
		
		return this.modelMapper.map(updatedEmployee, EmployeeDto.class);
	}

	@Override
	public EmployeeDto unsubscribePlan(Integer employeeId, Integer planId) {
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		Set<Plan> plan = employee.getPlan();
		 
		Plan unsubscribePlan = this.planRepo.findById(planId)
				.orElseThrow(()-> new ResourceNotFoundException("Plan","planId",planId));
		
		boolean flag = plan.remove(unsubscribePlan);
		System.out.println(flag+"###########"+unsubscribePlan);
		employee.setPlan(plan);
		Employee updatedEmployee = this.employeeRepo.save(employee);
		
		return this.modelMapper.map(updatedEmployee, EmployeeDto.class);
		
	
	}

	@Override
	public EmployeeDto registerEmployee(EmployeeDto employeeDto) {
	
		Employee employee = this.modelMapper.map(employeeDto, Employee.class);
		employee.setEmployeeEmail(employeeDto.getEmployeeEmail());
		employee.setBasicSalary(employeeDto.getBasicSalary());
		employee.setEmployeeName(employeeDto.getEmployeeName());
		employee.setEmployeeMobNo(employeeDto.getEmployeeMobNo());
	
		//password encoding
		employee.setEmployeePassword(this.passwordEncoder.encode(employeeDto.getEmployeePassword()));
		
		//setting default role
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		employee.getRoles().add(role);
		Employee newEmployee = this.employeeRepo.save(employee);
		
		return this.modelMapper.map(newEmployee, EmployeeDto.class);
	}
	

}
