package com.backend.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
import com.backend.app.payloads.CompanyDto;
import com.backend.app.services.CompanyService;

@CrossOrigin(origins="http://localhost:3000",allowedHeaders="*")
@RestController
@RequestMapping(value="/api/company")
public class CompanyController {
	
	@Autowired
	private CompanyService companyService;
	
	@PostMapping("/")
	public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto){

		CompanyDto newCompanyDto = this.companyService.createCompany(companyDto);
		return new ResponseEntity<>(newCompanyDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{companyId}")
	public ResponseEntity<CompanyDto> updateCompany(@RequestBody CompanyDto companyDto,@PathVariable("companyId")Integer cid){
		
		CompanyDto updatedCompanyDto = this.companyService.updateCompany(companyDto,cid);
		return ResponseEntity.ok(updatedCompanyDto);
	}
	
	@PutMapping("/{companyId}/ccid/{carrierId}")
	public ResponseEntity<CompanyDto> addCarrier(@PathVariable("companyId")Integer cid,@PathVariable("carrierId")Integer ccid){
		
		CompanyDto updatedCompanyDto = this.companyService.addCarrier(cid,ccid);
		return ResponseEntity.ok(updatedCompanyDto);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CompanyDto>> getAllCompanies(){
		return ResponseEntity.ok(this.companyService.getAllCompanies());
	}
	
	@GetMapping("/{companyId}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable("companyId")Integer cid){
		return ResponseEntity.ok(this.companyService.getCompanyById(cid));
	}
	@DeleteMapping("/{companyId}")
	public ApiResponse deleteCompany(@PathVariable ("companyId") Integer cid) {
	  this.companyService.deleteCompany(cid);
	  return new ApiResponse("Company details deleted sucessfully !",true);
	}
	
	
}
