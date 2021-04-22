package com.PP1_BackEnd.Springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.repository.JobEmployerRepo;


@Service
public class JobEmployerService {
	
	
	@Autowired
	private JobEmployerRepo employerRepo ;

	public JobEmployer saveBooking(JobEmployer job) {
		return employerRepo.save(job);
	}
	

}
