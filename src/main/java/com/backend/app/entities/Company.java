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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int companyId;
	
	private String companyName;
	private String companyEmail;
	private String companyContact;
	private String companyAddress;
	
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Employee> employee = new ArrayList<>();
	
	@ManyToMany(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinTable(name = "COMPANY_CARRIER_TBL",
				joinColumns= {
						@JoinColumn(name="compId", referencedColumnName = "companyId")
				},
				inverseJoinColumns = {
						@JoinColumn(name="carrId", referencedColumnName = "carrierId")
				}
			)
	private Set<Carrier> carrier= new HashSet<>();
	
	


}
