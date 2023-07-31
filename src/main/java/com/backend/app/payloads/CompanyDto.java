package com.backend.app.payloads;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CompanyDto {
	
	private int companyId;
	private String companyName;
	private String companyEmail;
	private String companyContact;
	private String companyAddress;
	
	//private List<EmployeeDto> employee = new ArrayList<>();
	private ArrayList<CarrierDto> carrier= new ArrayList<>();

}
