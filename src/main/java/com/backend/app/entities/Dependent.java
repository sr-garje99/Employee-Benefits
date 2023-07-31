package com.backend.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class Dependent {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int dependentId;
	
	private String Name;
	private String Relation;
	private int age;
	
	@ManyToOne
	private Employee employee;

}
