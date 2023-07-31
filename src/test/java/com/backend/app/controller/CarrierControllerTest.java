package com.backend.app.controller;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.backend.app.controllers.CarrierController;
import com.backend.app.entities.Carrier;
import com.backend.app.payloads.CarrierDto;
import com.backend.app.services.CarrierService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@ExtendWith(MockitoExtension.class)
public class CarrierControllerTest {
	
	private MockMvc mockMvc;
	
	@Mock
	private CarrierService caarrierService;
	
	@InjectMocks
	private CarrierController carrierController;
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWritter = objectMapper.writer();
	
	CarrierDto record1 = new CarrierDto(1,"Star","contact@star.com");

}

