package com.backend.app.controllers;
import java.security.Principal;
import java.util.Optional;

//import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.entities.Employee;
import com.backend.app.exceptions.ApiException;
import com.backend.app.payloads.EmployeeDto;
import com.backend.app.payloads.JwtAuthRequest;
import com.backend.app.payloads.JwtAuthResponse;
import com.backend.app.repositories.EmployeeRepo;
import com.backend.app.security.JwtTokenHelper;
import com.backend.app.services.EmployeeService;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private EmployeeService userService;

	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
		
		//System.out.println(request+"JWT");
		this.authenticate(request.getEmployeeEmail(), request.getEmployeePassword());
		
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmployeeEmail());
		
		String token = this.jwtTokenHelper.generateToken(userDetails);

		JwtAuthResponse response = new JwtAuthResponse();
		
		response.setToken(token);
		
		response.setUser(this.mapper.map((Employee) userDetails, EmployeeDto.class));
		
		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		try {

			this.authenticationManager.authenticate(authenticationToken);

		} catch (BadCredentialsException e) {
			System.out.println("Invalid Detials !!");
			throw new ApiException("Invalid username or password !!");
		}

	}

	// register new user api

	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<EmployeeDto> registerUser( @RequestBody EmployeeDto userDto) {
		EmployeeDto registeredUser = this.userService.registerEmployee(userDto);
		return new ResponseEntity<EmployeeDto>(registeredUser, HttpStatus.OK);
	}

	// get loggedin user data
	@Autowired
	private EmployeeRepo userRepo;
	@Autowired
	private ModelMapper mapper;

	@GetMapping("/current-user/")
	public ResponseEntity<EmployeeDto> getUser(Principal principal) {
		Employee user = this.userRepo.findByEmployeeEmail(principal.getName()).get();
		return new ResponseEntity<EmployeeDto>(this.mapper.map(user, EmployeeDto.class), HttpStatus.OK);
	}

}