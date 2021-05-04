package com.PP1_BackEnd.Springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.model.Profile;
import com.PP1_BackEnd.Springboot.payload.request.ProfileRequest;
import com.PP1_BackEnd.Springboot.repository.ProfileRepo;

@Service
public class ProfileService {
	
	
	@Autowired
	private ProfileRepo profileRepo ;

	public void saveProfile(Profile job) {
		 profileRepo.save(job);
	}

	

}

