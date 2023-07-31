package com.backend.app.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Carrier {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int carrierId;
	
	private String carrierName;
	private String carrierContact;
	
//	@OneToMany(mappedBy = "carrier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	private Set<Plan> plan = new HashSet<>();
//	
	@ManyToMany(mappedBy="carrier")
	private Set<Company> company = new HashSet<>();
	

}
