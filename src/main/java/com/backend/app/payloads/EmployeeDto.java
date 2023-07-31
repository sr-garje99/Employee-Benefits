package com.backend.app.payloads;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class EmployeeDto {
	
	private int employeeId;
	private String employeeName;
	
	private String employeeEmail;
	private String employeePassword;
	private String employeeMobNo;
	private boolean isAdmin;
	private double BasicSalary;
	private double deductionAmount;
	private int employeeAge;
	private CompanyDto company;
	//private Set<DependentDto> dependent = new HashSet<>();
	private Set<PlanDto> plan = new HashSet<>();

}
