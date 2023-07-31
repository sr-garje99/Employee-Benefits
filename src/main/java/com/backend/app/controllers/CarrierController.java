package com.backend.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.payloads.ApiResponse;
import com.backend.app.payloads.CarrierDto;
import com.backend.app.services.CarrierService;

@RestController
@RequestMapping(value="api/carrier")
public class CarrierController {
	
	@Autowired
	private CarrierService carrierService;
	
	@PostMapping("/")
	public ResponseEntity<CarrierDto> createCarrier(@RequestBody CarrierDto carrierDto){

		CarrierDto newCarrierDto = this.carrierService.createCarrier(carrierDto);
		return new ResponseEntity<>(newCarrierDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{carrierId}")
	public ResponseEntity<CarrierDto> updateCarrier(@RequestBody CarrierDto CarrierDto,@PathVariable("carrierId")Integer cid){
		
		CarrierDto updatedCarrierDto = this.carrierService.updateCarrier(CarrierDto,cid);
		return ResponseEntity.ok(updatedCarrierDto);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CarrierDto>> getAllCompanies(){
		return ResponseEntity.ok(this.carrierService.getAllCarriers());
	}
	
	@GetMapping("/{carrierId}")
	public ResponseEntity<CarrierDto> getCarrierById(@PathVariable("CarrierId")Integer cid){
		return ResponseEntity.ok(this.carrierService.getCarrierById(cid)) ;
	}
	@DeleteMapping("/{CarrierId}")
	public ApiResponse deleteCarrier(@PathVariable ("CarrierId") Integer cid) {
	  this.carrierService.deleteCarrier(cid);
	  return new ApiResponse("Carrier details deleted sucessfully !",true);
	}


}
