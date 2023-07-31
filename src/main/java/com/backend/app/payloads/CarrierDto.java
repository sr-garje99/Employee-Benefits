package com.backend.app.payloads;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarrierDto {
	
	private int carrierId;
	private String carrierName;
	private String carrierContact;
	
	//private Set<CompanyDto> company = new HashSet<>();
	
//	private Set<PlanDto> plan = new HashSet<>();
	
	

}
