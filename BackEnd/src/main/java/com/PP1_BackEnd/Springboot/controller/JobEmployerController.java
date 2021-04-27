package com.PP1_BackEnd.Springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.payload.response.MessageResponse;
import com.PP1_BackEnd.Springboot.service.JobEmployerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job/employer")
public class JobEmployerController {
	
	 @Autowired
	    public JobEmployerService JobEmployerService;
	
	 @PostMapping("/postjob")
	    public ResponseEntity < ? > addJob(@RequestBody JobEmployer job) {
		 System.out.println("This   -----  username ----- "+job.getEmployerUsername());
	        	JobEmployerService.saveBooking(job);
	           
	            return ResponseEntity.ok(new MessageResponse("Booking Successfull!"));
	    }

	@PostMapping("/postjob")
	public ResponseEntity<?> addJob(@RequestBody JobEmployer job) {
		System.out.println(job.getEmployerUsername());
		JobEmployerService.saveBooking(job);
		return ResponseEntity.ok(new MessageResponse("Booking Successfull!"));
	}

}