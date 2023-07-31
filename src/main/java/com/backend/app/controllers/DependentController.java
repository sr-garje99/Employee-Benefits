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
import com.backend.app.payloads.DependentDto;
import com.backend.app.services.DependentService;

@RestController
@RequestMapping(value="api/dependent")
public class DependentController {
	
	@Autowired
	private DependentService dependentService;
	
	@PostMapping("/{employeeId}")
	public ResponseEntity<DependentDto> createDependent(@RequestBody DependentDto DependentDto, @PathVariable("employeeId")Integer eid){

		DependentDto newDependentDto = this.dependentService.createDependent(DependentDto,eid);
		return new ResponseEntity<>(newDependentDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{dependentId}")
	public ResponseEntity<DependentDto> updateDependent(@RequestBody DependentDto DependentDto,@PathVariable("dependentId")Integer cid){
		
		DependentDto updatedDependentDto = this.dependentService.updateDependent(DependentDto,cid);
		return ResponseEntity.ok(updatedDependentDto);
	}
	
	@GetMapping("/eid/{employeeId}")
	public ResponseEntity<List<DependentDto>> getAllDependentByEmployeeId(@PathVariable("employeeId")Integer eid){
		return ResponseEntity.ok(this.dependentService.getDependentByEmployeeId(eid) );
	}
	@GetMapping("/")
	public ResponseEntity<List<DependentDto>> getAllDependent(){
		return ResponseEntity.ok(this.dependentService.getAllDependent());
	}
	@GetMapping("/{dependentId}")
	public ResponseEntity<DependentDto> getDependentById(@PathVariable("dependentId")Integer cid){
		return ResponseEntity.ok(this.dependentService.getDependentById(cid));
	}
	@DeleteMapping("/{DependentId}")
	public ApiResponse deleteDependent(@PathVariable ("DependentId") Integer cid) {
	  this.dependentService.deleteDependent(cid);
	  return new ApiResponse("Dependent details deleted sucessfully !",true);
	}


}
