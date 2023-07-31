package com.backend.app.payloads;

import java.util.HashSet;
import java.util.Set;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlanDto {
	
	private int planId;
	private String planName;
	private double planEmi;
	private double tenure;
	private double coverAmount;
	private String planType;
	
	private CarrierDto carrier;
	//private Set<EmployeeDto> employee = new HashSet<>();

}
