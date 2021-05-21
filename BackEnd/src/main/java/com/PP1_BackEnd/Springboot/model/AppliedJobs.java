package com.PP1_BackEnd.Springboot.model;

import javax.persistence.Column;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Applied_Jobs")

public class AppliedJobs {
	
	@Id
	 @Column(name = "JobId")
	private int id;
	
	 @Column(name = "username")
	private String username;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	 
	 

}