package com.backend.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.Company;

public interface CompanyRepo extends JpaRepository<Company,Integer> {

}
