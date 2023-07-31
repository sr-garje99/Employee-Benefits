package com.backend.app.payloads;

import lombok.Data;

@Data
public class JwtAuthRequest {

	private String employeeEmail;
	
	private String employeePassword;
	
}