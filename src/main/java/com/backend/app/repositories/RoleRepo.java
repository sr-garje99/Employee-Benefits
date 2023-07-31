package com.backend.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.Role;


public interface RoleRepo extends JpaRepository<Role, Integer> {

}
