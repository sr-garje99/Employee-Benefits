package com.backend.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.payloads.ApiResponse;
import com.backend.app.payloads.EmployeeDto;
import com.backend.app.payloads.PlanDto;
import com.backend.app.payloads.EmployeeDto;
import com.backend.app.services.EmployeeService;

@RestController
@RequestMapping(value="api/employee")
public class EmployeeController {
	
	@Autowired 
	private EmployeeService employeeService;
	
	@CrossOrigin
	@PostMapping("/")
	ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto newEmployeeDto = this.employeeService.createEmployee(employeeDto);
		
		return new ResponseEntity<>(newEmployeeDto,HttpStatus.OK);
	}
	
	@CrossOrigin
	@PostMapping("/login/")
	ResponseEntity<EmployeeDto> loginEmployee(@RequestBody EmployeeDto employeeDto){
		
		EmployeeDto newEmployeeDto = this.employeeService.login(employeeDto);
		
		if(newEmployeeDto.getEmployeeId() == 0) {
			return new ResponseEntity<>(newEmployeeDto,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(newEmployeeDto,HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("/{employeeId}/cid/{companyId}")
	public ResponseEntity<EmployeeDto> updateEmployee(@RequestBody EmployeeDto employeeDto,@PathVariable ("employeeId") Integer eid,@PathVariable ("companyId") Integer cid){
		
		EmployeeDto updatedEmployeeDto = this.employeeService.updateEmployee(employeeDto,eid,cid);
		return ResponseEntity.ok(updatedEmployeeDto);
	}
	@CrossOrigin
	@PutMapping("/{employeeId}/add/{planId}")
	public ResponseEntity<EmployeeDto> updatePlan(@PathVariable ("employeeId") Integer eid,@PathVariable("planId")Integer pid){
		
		EmployeeDto updatedEmployeeDto = this.employeeService.addPlans(pid,eid);
		return ResponseEntity.ok(updatedEmployeeDto);
	}
	@CrossOrigin
	@PutMapping("/{employeeId}/plan/{planId}")
	public ResponseEntity<EmployeeDto> unsubscribePlan(@PathVariable ("employeeId") Integer eid,@PathVariable("planId")Integer pid){
		
		EmployeeDto updatedEmployeeDto = this.employeeService.unsubscribePlan(eid, pid);
		return ResponseEntity.ok(updatedEmployeeDto);
	}
	@CrossOrigin
	@GetMapping("/cid/{companyId}")
	public ResponseEntity<List<EmployeeDto>> getAllEmployeesByCompanyId(@PathVariable ("companyId") Integer cid){
		return ResponseEntity.ok(this.employeeService.getAllEmployeeByCompanyId(cid));
	}
	
	@CrossOrigin
	@GetMapping("/{employeeId}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("employeeId")Integer eid){
		return ResponseEntity.ok(this.employeeService.getEmployeeById(eid));
	}
	@CrossOrigin
	@GetMapping("/")
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		return ResponseEntity.ok(this.employeeService.getAllEmployees());
	}
	
	@CrossOrigin
	@DeleteMapping("/{employeeId}")
	public ApiResponse deleteEmployee(@PathVariable ("employeeId") Integer eid) {
	  this.employeeService.deleteEmployee(eid);
	  return new ApiResponse("Employee details deleted sucessfully !",true);
	}

}
