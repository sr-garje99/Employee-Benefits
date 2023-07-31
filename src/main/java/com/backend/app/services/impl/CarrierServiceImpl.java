package com.backend.app.services.impl;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Company;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.payloads.CarrierDto;
import com.backend.app.payloads.PlanDto;
import com.backend.app.repositories.CarrierRepo;
import com.backend.app.repositories.CompanyRepo;
import com.backend.app.services.CarrierService;

@Service
public class CarrierServiceImpl implements CarrierService {
	
	@Autowired
	private CarrierRepo carrierRepo;
	
	@Autowired
	private CompanyRepo companyRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CarrierDto createCarrier(CarrierDto carrierDto) {
		
		Carrier carrier = this.modelMapper.map(carrierDto,Carrier.class);
		Carrier newCarrier = this.carrierRepo.save(carrier);
		return this.modelMapper.map(newCarrier, CarrierDto.class);
	}

	@Override
	public CarrierDto updateCarrier(CarrierDto carrierDto, Integer carrierId) {
		
		Carrier carrier = this.carrierRepo.findById(carrierId).orElseThrow(()-> new ResourceNotFoundException("Carrier","caerrierId",carrierId) );
		carrier.setCarrierName(carrierDto.getCarrierName());
		carrier.setCarrierContact(carrierDto.getCarrierContact());
		
		Carrier updatedCarrier = this.carrierRepo.save(carrier);
		return this.modelMapper.map(updatedCarrier,CarrierDto.class);
	}

	@Override
	public CarrierDto getCarrierById(Integer carrierId) {
		
		Carrier carrier = this.carrierRepo.findById(carrierId)
				.orElseThrow(()-> new ResourceNotFoundException("Carrier","carrierId",carrierId));
		return this.modelMapper.map(carrier, CarrierDto.class);
	}

	@Override
	public List<CarrierDto> getAllCarriers() {
	    
		List<Carrier> carriers = this.carrierRepo.findAll();
	    
		List<CarrierDto> carrierDtos = carriers.stream().map((carrier)->this.modelMapper.map(carrier,CarrierDto.class))
				.collect(Collectors.toList());
	   
		return carrierDtos;
	}

	@Override
	public void deleteCarrier(Integer carrierId) {
		
		Carrier carrier = this.carrierRepo.findById(carrierId)
							.orElseThrow(()-> new ResourceNotFoundException("Carrier","carrierId",carrierId));

		this.carrierRepo.delete(carrier);
	}

	@Override
	public List<CarrierDto> getAllCarrierByCompanyId(Integer companyId) {
		
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(()-> new ResourceNotFoundException("Company","companyId",companyId));
		
		List<Carrier> carriers = this.carrierRepo.findByCompany(company);
		
		List<CarrierDto> carrierDtos = carriers.stream().map((carrier)-> this.modelMapper.map(carrier, CarrierDto.class)).collect(Collectors.toList());
		
		return carrierDtos;
	}
	
	

}
