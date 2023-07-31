package com.backend.app.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {

	private String token;
	
	private EmployeeDto user;
}
