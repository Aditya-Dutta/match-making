package com.PP1_BackEnd.Springboot.controller;

import java.util.List;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.payload.request.InfoRequest;
import com.PP1_BackEnd.Springboot.service.JobSeekerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job/seeker")
public class JobSeekerController {
	
	
	@Autowired
    public JobSeekerService JobSeekerService;

 @GetMapping("/getjob")
    public List<JobEmployer> getJob() {
	 
	 return JobSeekerService.getAllJobs();
           
          
    }
 
 @PostMapping("/category")
 public List<JobEmployer> getByCategory(@RequestBody InfoRequest info){
	 return JobSeekerService.getByCategory(info.getCategory());
 }
 
 
 @PostMapping("/username")
 public List<JobEmployer> getByUsername(@RequestBody InfoRequest info){
	 return JobSeekerService.getByUsername(info.getUsername());
 }
 
 
 @PostMapping("/location")
 public List<JobEmployer> getByLocation(@RequestBody InfoRequest info){
	 return JobSeekerService.getByLocation(info.getLocationPincode());
 }
 
 
 
 @PostMapping("/jobtype")
 public List<JobEmployer> getByJobType(@RequestBody InfoRequest info){
	 return JobSeekerService.getByJobType(info.getJobType());
 }
 
 
 
 
 
 
 

}

