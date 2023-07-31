package com.backend.app.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.app.entities.Dependent;
import com.backend.app.entities.Employee;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.payloads.DependentDto;
import com.backend.app.repositories.DependentRepo;
import com.backend.app.repositories.EmployeeRepo;
import com.backend.app.services.DependentService;

@Service
public class DependentServiceImpl implements DependentService{
	
	@Autowired
	private DependentRepo dependentRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	

	@Override
	public DependentDto createDependent(DependentDto dependentDto, Integer employeeId) {
		
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		
		Dependent dependent = this.modelMapper.map(dependentDto, Dependent.class);
		
		dependent.setName(dependentDto.getName());
		dependent.setAge(dependentDto.getAge());
		dependent.setRelation(dependentDto.getRelation());
		dependent.setEmployee(employee);
		
		Dependent newDependent= this.dependentRepo.save(dependent);
		
		return this.modelMapper.map(newDependent, DependentDto.class);
	}

	@Override
	public DependentDto updateDependent(DependentDto dependentDto, Integer employeeId) {
		
		Dependent dependent = this.modelMapper.map(dependentDto, Dependent.class );
		
		Employee employee = this.employeeRepo.findById(employeeId)
							.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		
		dependent.setName(dependentDto.getName());
		dependent.setAge(dependentDto.getAge());
		dependent.setRelation(dependentDto.getRelation());
		dependent.setEmployee(employee);
		
		Dependent updatedDependent= this.dependentRepo.save(dependent);
		
		
		return this.modelMapper.map(updatedDependent, DependentDto.class);
	}

	@Override
	public DependentDto getDependentById(Integer dependentId) {
		Dependent dependent = this.dependentRepo.findById(dependentId)
								.orElseThrow(()-> new ResourceNotFoundException("Dependent","dependentId",dependentId));
		return this.modelMapper.map(dependent, DependentDto.class);
	}

	@Override
	public List<DependentDto> getDependentByEmployeeId(Integer employeeId) {
		
		Employee employee = this.employeeRepo.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","employeeId",employeeId));
		List<Dependent> dependents = this.dependentRepo.findByEmployee(employee); 
		
		List<DependentDto> dependentDtos = dependents.stream().map((dependent)-> this.modelMapper.map(dependent,DependentDto.class)).collect(Collectors.toList());
		
		return dependentDtos;
	}

	@Override
	public void deleteDependent(Integer dependentId) {
		
		Dependent dependent = this.dependentRepo.findById(dependentId)
				.orElseThrow(()-> new ResourceNotFoundException("Dependent","dependentId",dependentId));

		this.dependentRepo.delete(dependent);
			
	}

	@Override
	public List<DependentDto> getAllDependent() {
List<Dependent> dependents = this.dependentRepo.findAll(); 
		
		List<DependentDto> dependentDtos = dependents.stream().map((dependent)-> this.modelMapper.map(dependent,DependentDto.class)).collect(Collectors.toList());
		
		return dependentDtos;
	}

}
