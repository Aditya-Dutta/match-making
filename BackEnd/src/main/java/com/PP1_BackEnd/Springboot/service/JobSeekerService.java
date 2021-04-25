package com.PP1_BackEnd.Springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.repository.JobSeekerRepo;

@Service
public class JobSeekerService {

	@Autowired
	private JobSeekerRepo seekerRepo ;

//	public JobEmployer saveBooking(JobSeeker job) {
//		return seekerRepo.save(job);
//	}
	
	public List<JobEmployer> getAllJobs()
	{
		return seekerRepo.getAllJobs();
	}
}
