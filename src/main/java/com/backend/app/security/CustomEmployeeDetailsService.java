package com.backend.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.app.entities.Employee;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.repositories.EmployeeRepo;

@Service
public class CustomEmployeeDetailsService implements UserDetailsService{

	@Autowired
	private EmployeeRepo employeeRepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println(username+"testingone");
		Employee employee = this.employeeRepo.findByEmployeeEmail(username)
				.orElseThrow(()-> new ResourceNotFoundException("Employee","email"+ username,0));
	    return employee;	
	}

}
