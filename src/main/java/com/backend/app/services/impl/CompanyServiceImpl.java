package com.backend.app.services.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Company;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.payloads.CompanyDto;
import com.backend.app.repositories.CarrierRepo;
import com.backend.app.repositories.CompanyRepo;
import com.backend.app.services.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
	
	@Autowired
	private CompanyRepo companyRepo;
	
	@Autowired
	private CarrierRepo carrierRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override 
	public CompanyDto createCompany(CompanyDto companyDto) {
		Company company = this.dtoToCompany(companyDto);
		Company savedCompany = this.companyRepo.save(company);
		return this.companyToDto(savedCompany);

	}

	@Override
	public CompanyDto updateCompany(CompanyDto companyDto, Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId)
							.orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		company.setCompanyName(companyDto.getCompanyName());
		company.setCompanyAddress(companyDto.getCompanyAddress());
		company.setCompanyContact(companyDto.getCompanyContact());
		company.setCompanyEmail(companyDto.getCompanyEmail());
		//company.setCarrier();
		
		Company updatedCompany = this.companyRepo.save(company);
		return this.modelMapper.map(updatedCompany,CompanyDto.class);
	}

	@Override
	public CompanyDto getCompanyById(Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		return this.companyToDto(company);
	}

	@Override
	public List<CompanyDto> getAllCompanies() {
		
		List <Company> companies = this.companyRepo.findAll();
		
		List<CompanyDto> companyDtos = companies.stream().map(company -> this.companyToDto(company)).collect(Collectors.toList());
		
		return companyDtos;
	}

	@Override
	public void deleteCompany(Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId).orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		this.companyRepo.delete(company);	
	}
	
	public CompanyDto companyToDto(Company company) {
		
		CompanyDto companyDto = this.modelMapper.map(company,CompanyDto.class);
		return companyDto;
	}
	
	public Company dtoToCompany(CompanyDto companyDto) {
		
		Company company = this.modelMapper.map(companyDto, Company.class);
		return company;
		
	}

	@Override
	public CompanyDto addCarrier(Integer companyId, Integer carrierId) {
		Carrier carrier = this.carrierRepo.findById(carrierId)
				.orElseThrow(()-> new ResourceNotFoundException("Carrier","carrierId",carrierId));
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		Set<Carrier>carrierList = new HashSet<Carrier>();
		carrierList= company.getCarrier();
		carrierList.add(carrier);
		company.setCarrier(carrierList);
		Company updatedCompany = this.companyRepo.save(company);
		return this.modelMapper.map(updatedCompany,CompanyDto.class);
	}

}
