package com.backend.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Plan;

public interface PlanRepo extends JpaRepository<Plan, Integer> {
	
	List<Plan> findByCarrier(Carrier carrier);
	
//	@Query("select p from Plan p where p.carrierId like :key")
//	List<Plan> searchByCarrierId(@Param("key") int carrierId);
}
