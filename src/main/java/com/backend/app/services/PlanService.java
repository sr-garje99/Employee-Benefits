package com.backend.app.services;

import java.util.List;

import com.backend.app.payloads.PlanDto;

public interface PlanService {
	
	PlanDto createPlan(PlanDto planDto,Integer carrierId);
	PlanDto updatePlan(PlanDto planDto,Integer planId);
	PlanDto getPlanById(Integer planId);
	List<PlanDto> getAllPlanByCarrierId(Integer carrierId);
	
	
	List<PlanDto> getAllPlans();
	void deletePlan(Integer planId);

}
