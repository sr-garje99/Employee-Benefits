package com.backend.app.services;

import java.util.List;

import com.backend.app.payloads.CompanyDto;

public interface CompanyService {
	
	CompanyDto createCompany(CompanyDto companyDto);
	CompanyDto updateCompany(CompanyDto companyDto,Integer companyId);
	CompanyDto addCarrier(Integer companyId, Integer carrierId);
	CompanyDto getCompanyById(Integer companyId);
	List<CompanyDto> getAllCompanies();
	void deleteCompany(Integer companyId);

}
