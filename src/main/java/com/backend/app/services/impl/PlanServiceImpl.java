package com.backend.app.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.app.entities.Carrier;
import com.backend.app.entities.Employee;
import com.backend.app.entities.Plan;
import com.backend.app.exceptions.ResourceNotFoundException;
import com.backend.app.payloads.CarrierDto;
import com.backend.app.payloads.PlanDto;
import com.backend.app.repositories.CarrierRepo;
import com.backend.app.repositories.DependentRepo;
import com.backend.app.repositories.EmployeeRepo;
import com.backend.app.repositories.PlanRepo;

@Service
public class PlanServiceImpl implements com.backend.app.services.PlanService {

	@Autowired
	private PlanRepo planRepo;
	
	@Autowired
	private CarrierRepo carrierRepo;
	
	@Autowired
	private DependentRepo dependentRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public PlanDto createPlan(PlanDto planDto,Integer carrierId) {
		
		Carrier carrier = this.carrierRepo.findById(carrierId).orElseThrow(()-> new ResourceNotFoundException("Carrier","caerrierId",carrierId) );
		
		Plan plan = this.modelMapper.map(planDto,Plan.class);
		plan.setPlanName(planDto.getPlanName());
		plan.setPlanEmi(planDto.getPlanEmi());
		plan.setTenure(planDto.getTenure());
		plan.setCarrier(carrier);
		
		Plan newPlan = this.planRepo.save(plan);
		return this.modelMapper.map(newPlan,PlanDto.class);
	}

	@Override
	public PlanDto updatePlan(PlanDto planDto,Integer planId) {
		
		Plan plan = this.planRepo.findById(planId)
				.orElseThrow(()-> new ResourceNotFoundException("Plan","planId",planId));
		
		//Carrier carrier = this.carrierRepo.findById(planDto.getCarrier().getCarrierId()).get();
		plan.setPlanName(planDto.getPlanName());
		plan.setPlanEmi(planDto.getPlanEmi());
		plan.setTenure(planDto.getTenure());
		plan.setPlanType(planDto.getPlanType());
		plan.setCoverAmount(planDto.getCoverAmount());
		//plan.setCarrier(plan.getCarrier());
		
		Plan updatedPlan = this.planRepo.save(plan);
		
		return this.modelMapper.map(updatedPlan, PlanDto.class);
	}

	@Override
	public PlanDto getPlanById(Integer planId) {
		
		Plan plan = this.planRepo.findById(planId)
				.orElseThrow(()-> new ResourceNotFoundException("Plan","planId",planId));
		return this.modelMapper.map(plan,PlanDto.class);
	}

	@Override
	public List<PlanDto> getAllPlanByCarrierId(Integer carrierId) {
		
		Carrier carrier = this.carrierRepo.findById(carrierId)
				.orElseThrow(()-> new ResourceNotFoundException("Carrier","carrierId",carrierId));
		System.out.print(carrier + "hellos");
		List<Plan> plans = this.planRepo.findByCarrier(carrier);
		
		List<PlanDto> planDtos = plans.stream().map((plan)-> this.modelMapper.map(plan, PlanDto.class)).collect(Collectors.toList());
		
		return planDtos;
	}

	@Override
	public void deletePlan(Integer planId) {
		
		Plan plan = this.planRepo.findById(planId)
				.orElseThrow(()-> new ResourceNotFoundException("Plan","planId",planId) );
		this.planRepo.delete(plan);
		
		

	}

	@Override
	public List<PlanDto> getAllPlans() {
		List<Plan> plans = this.planRepo.findAll();
		
		List<PlanDto> planDtos = plans.stream().map((plan)-> this.modelMapper.map(plan, PlanDto.class)).collect(Collectors.toList());
		
		return planDtos;
	}

	
	    
	

	

}
