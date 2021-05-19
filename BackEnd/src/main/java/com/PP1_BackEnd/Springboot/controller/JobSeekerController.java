package com.PP1_BackEnd.Springboot.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.PP1_BackEnd.Springboot.model.JobEmployer;
import com.PP1_BackEnd.Springboot.model.Profile;
import com.PP1_BackEnd.Springboot.model.User;
import com.PP1_BackEnd.Springboot.payload.request.JobEmployerRequest;
import com.PP1_BackEnd.Springboot.payload.request.JobSeekerRequest;
import com.PP1_BackEnd.Springboot.repository.UserRepository;
import com.PP1_BackEnd.Springboot.service.JobEmployerService;
import com.PP1_BackEnd.Springboot.service.JobSeekerService;
import com.PP1_BackEnd.Springboot.service.ProfileService;
import com.PP1_BackEnd.Springboot.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job/seeker")
public class JobSeekerController {


	@Autowired
	public JobSeekerService SeekerService;
	@Autowired
	UserRepository userRepository;

	@Autowired
	JobEmployerService employerService;

	@Autowired
	ProfileService profileService;

	@Autowired
	UserService userService;

	@GetMapping("/getjob")
	public List<JobEmployer> getJob() {
		return SeekerService.getAllJobs();     
	}

	@PostMapping("/category")
	public List<JobEmployer> getByCategory(@RequestBody JobSeekerRequest info){
		return SeekerService.getByCategory(info.getCategory());
	}

	@PostMapping("/username")
	public List<JobEmployer> getByUsername(@RequestBody JobSeekerRequest info){
		return SeekerService.getByUsername(info.getUsername());
	}

	@PostMapping("/location")
	public List<JobEmployer> getByLocation(@RequestBody JobSeekerRequest info){
		return SeekerService.getByLocation(info.getLocationPincode());
	}

	@PostMapping("/job_type")
	public List<JobEmployer> getByJobType(@RequestBody JobSeekerRequest info){
		return SeekerService.getByJobType(info.getJobType());
	}


	@PostMapping("/findall")
	public List<JobEmployer> getByAllSearch(@RequestBody JobSeekerRequest info){
		// "null"

		return SeekerService.findJobs(info.getJobType(), info.getCategory(), info.getLocationPincode());
	}

	@PostMapping("/viewAll")
	public List<JobEmployer> viewAllJob()
	{
		return SeekerService.viewAll();
	}
	
	@PostMapping("/viewAllProfile")
	public List<Profile> viewAllProfile()
	{
		return profileService.getAllProfile();
	}
	
	
	@PostMapping("/viewAllSeeker")
	public List<User> viewAllBySeeker()
	{
		return userService.getAllBySeeker();
	}
	

	// passing username only
	@PostMapping("/deleteSeeker")
	public Boolean deleteAdmin(@Valid@RequestBody JobSeekerRequest info) {
		if (userRepository.existsByUsername(info.getUsername()) && userService.getUserType(info.getUsername()).equals("JOB_SEEKER")) {
			String username = info.getUsername();
			profileService.deleteProfile(username);
			employerService.deleteEmployer(username);
			userService.deleteUser(username);
			return true;
		}
		return false;
	}

	// job id and username
	@PostMapping("/applyJob")
	public Boolean applyJob(@RequestBody JobSeekerRequest info){
		
		List<Integer> ids = SeekerService.getAppliedJob(info.getUsername());
		
		for(Integer i: ids)
		{
			if(i==info.getId())
			{
				return false;
			}
		}

		SeekerService.applyJob(info.getId(), info.getUsername());
		return true;
	}

	// username
	@PostMapping("/getAppliedJobs")
	public List<JobEmployer> getJobsApplied(@RequestBody JobSeekerRequest info)
	{
		List<Integer> ids = SeekerService.getAppliedJob(info.getUsername());
		List<JobEmployer> jobs= new ArrayList<JobEmployer>();
		for(Integer i: ids)
		{
			jobs.add(SeekerService.getJobsFromID(i));
		}
		return jobs;
	}





}

