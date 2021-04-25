package com.PP1_BackEnd.Springboot.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.payload.request.JobSeekerRequest;
import com.PP1_BackEnd.Springboot.service.JobSeekerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job/seeker")
public class JobSeekerController {
	
	
	@Autowired
    public JobSeekerService JobSeekerService;

 @GetMapping("/getjob")
    public List<JobEmployer> getJob(@RequestBody JobSeekerRequest job) {
	 
	 return JobSeekerService.getAllJobs();
           
          
    }
 

}

