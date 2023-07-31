package com.backend.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.payloads.ApiResponse;
import com.backend.app.payloads.PlanDto;
import com.backend.app.services.PlanService;

@RestController
@RequestMapping(value="api/plan")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@PostMapping("/{carrierId}")
	public ResponseEntity<PlanDto> createPlan(@RequestBody PlanDto PlanDto,@PathVariable ("carrierId")Integer cid){

		PlanDto newPlanDto = this.planService.createPlan(PlanDto,cid);
		return new ResponseEntity<>(newPlanDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{PlanId}")
	public ResponseEntity<PlanDto> updatePlan(@RequestBody PlanDto PlanDto,@PathVariable("PlanId")Integer pid){
		
		PlanDto updatedPlanDto = this.planService.updatePlan(PlanDto,pid);
		
		return ResponseEntity.ok(updatedPlanDto);
	}
	
	@GetMapping("/cid/{carrierId}")
	public ResponseEntity<List<PlanDto>> getAllPlansByCarrierId(@PathVariable ("carrierId")Integer cid){
		return ResponseEntity.ok(this.planService.getAllPlanByCarrierId(cid));
	}
//	@GetMapping("/cid/{carrierId}")
//	public ResponseEntity<List<PlanDto>> getAllPlansByCarrierId(@PathVariable ("carrierId")Integer cid){
//		return ResponseEntity.ok(this.planService.getAllPlanByCarrierId(cid));
//	}
//	
	
	@GetMapping("/")
	public ResponseEntity<List<PlanDto>> getAllPlansByCarrierId(){
		return ResponseEntity.ok(this.planService.getAllPlans());
	}
	
	@GetMapping("/{PlanId}")
	public ResponseEntity<PlanDto> getPlanById(@PathVariable("PlanId")Integer cid){
		return ResponseEntity.ok(this.planService.getPlanById(cid));
	}
	
	@DeleteMapping("/{PlanId}")
	public ApiResponse deletePlan(@PathVariable ("PlanId") Integer cid) {
	  this.planService.deletePlan(cid);
	  return new ApiResponse("Plan details deleted sucessfully !",true);
	}

}
