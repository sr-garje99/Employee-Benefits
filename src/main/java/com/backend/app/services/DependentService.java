package com.backend.app.services;

import java.util.List;

import com.backend.app.payloads.DependentDto;

public interface DependentService {
	
	DependentDto createDependent(DependentDto dependentDto,Integer employeeId);
	DependentDto updateDependent(DependentDto dependentDto,Integer employeeId);
	DependentDto getDependentById(Integer dependentId);
	List<DependentDto> getDependentByEmployeeId(Integer employeeId);
	List<DependentDto> getAllDependent();
	void deleteDependent(Integer dependentId);
	

}
