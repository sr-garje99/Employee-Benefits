package com.backend.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Plan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int planId;
	
	private String planName;
	private double planEmi;
	private double tenure;
	private double coverAmount;
	private String dependentEligible;
	private String planType;

	@ManyToOne
	private Carrier carrier;
	
	@ManyToMany
	private Set<Employee> employee = new HashSet<>();
}
