package com.backend.app.payloads;

import javax.persistence.ManyToOne;

import com.backend.app.entities.Employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DependentDto {
	
	private int dependentId;
	private String Name;
	private String Relation;
	private int age;
	

	private EmployeeDto employee;

}
