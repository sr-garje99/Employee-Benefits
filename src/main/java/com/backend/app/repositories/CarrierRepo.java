package com.backend.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Company;

public interface CarrierRepo extends JpaRepository<Carrier,Integer> {
	
	List<Carrier> findByCompany(Company company);

}
