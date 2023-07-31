package com.backend.app.services;

import java.util.List;

import com.backend.app.payloads.CarrierDto;

public interface CarrierService {
	
	CarrierDto createCarrier(CarrierDto carrierDto);
	CarrierDto updateCarrier(CarrierDto carrierDto,Integer carrierId );
	CarrierDto getCarrierById(Integer carrierId);
	List<CarrierDto> getAllCarrierByCompanyId(Integer companyId);
	List<CarrierDto> getAllCarriers();
	void deleteCarrier(Integer carrierId);

}
